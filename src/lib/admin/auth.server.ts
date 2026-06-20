import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const COOKIE_NAME = "admin_session";
const SESSION_DAYS = 7;

// In-memory rate limit: ip -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function getSecret(): string {
  const s = process.env.ADMIN_COOKIE_SECRET ?? readLocalEnvValue("ADMIN_COOKIE_SECRET");
  if (!s || s.length < 16) {
    return "dev-secret-change-me-in-production-please-1234567";
  }
  return s;
}

function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD ?? readLocalEnvValue("ADMIN_PASSWORD");
  if (!pw) {
    console.warn("[admin] ADMIN_PASSWORD not set in .env — using default 'admin123'");
    return "admin123";
  }
  return pw;
}

function readLocalEnvValue(key: string): string | undefined {
  const envFiles = [".env.local", ".env"];
  for (const filename of envFiles) {
    const file = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(file)) continue;
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const name = trimmed.slice(0, eq).trim();
      if (name !== key) continue;
      return trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return undefined;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }
  entry.count++;
  return { allowed: true, retryAfterMs: 0 };
}

export function clearRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

export function verifyPassword(attempt: string): boolean {
  const expected = getPassword();
  const cleanAttempt = attempt.trim();
  const maxLen = Math.max(cleanAttempt.length, expected.length, 1);
  const a = Buffer.alloc(maxLen);
  const b = Buffer.alloc(maxLen);
  Buffer.from(cleanAttempt).copy(a);
  Buffer.from(expected).copy(b);
  return crypto.timingSafeEqual(a, b);
}

export function createSessionCookie(): string {
  const nonce = crypto.randomBytes(16).toString("hex");
  const expiry = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${expiry}|${nonce}`;
  const sig = sign(payload);
  return `${payload}|${sig}`;
}

export function buildSetCookieHeader(value: string): string {
  const isProd = process.env.NODE_ENV === "production";
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  let cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax`;
  if (isProd) cookie += "; Secure";
  return cookie;
}

export function buildClearCookieHeader(): string {
  return `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`;
}

export function parseCookieFromHeader(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(COOKIE_NAME + "="));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
}

export function verifySessionValue(value: string | undefined): boolean {
  try {
    if (!value) return false;
    const parts = value.split("|");
    if (parts.length !== 3) return false;
    const [expiry, nonce, sig] = parts;
    const payload = `${expiry}|${nonce}`;
    const expected = sign(payload);
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return false;
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
    if (Date.now() > parseInt(expiry, 10)) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifySession(request?: Request): boolean {
  try {
    const cookieHeader = request?.headers.get("cookie") ?? null;
    const value = parseCookieFromHeader(cookieHeader);
    return verifySessionValue(value);
  } catch {
    return false;
  }
}

export function requireAdmin(request?: Request) {
  if (!verifySession(request)) {
    throw new Error("UNAUTHORIZED");
  }
}
