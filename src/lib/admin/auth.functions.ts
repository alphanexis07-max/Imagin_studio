import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  checkRateLimit,
  verifyPassword,
  createSessionCookie,
  buildSetCookieHeader,
  buildClearCookieHeader,
  parseCookieFromHeader,
  verifySessionValue,
} from "./auth.server";

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    const req = getRequest();
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const rl = checkRateLimit(ip);
    if (!rl.allowed) {
      const secs = Math.ceil(rl.retryAfterMs / 1000);
      throw new Error(`RATE_LIMITED:${secs}`);
    }

    if (!verifyPassword(data.password)) {
      throw new Error("WRONG_PASSWORD");
    }

    const value = createSessionCookie();
    setResponseHeader("Set-Cookie", buildSetCookieHeader(value));
    return { success: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  setResponseHeader("Set-Cookie", buildClearCookieHeader());
  return { success: true };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const req = getRequest();
  const cookieHeader = req.headers.get("cookie");
  const value = parseCookieFromHeader(cookieHeader);
  return { loggedIn: verifySessionValue(value ?? "") };
});
