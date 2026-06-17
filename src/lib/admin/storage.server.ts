import fs from "node:fs";
import path from "node:path";

const STORAGE_DIR = path.resolve(process.cwd(), "src/server/storage");

export function storagePath(filename: string): string {
  return path.join(STORAGE_DIR, filename);
}

export function readJson<T>(filename: string, defaultValue: T): T {
  const file = storagePath(filename);
  try {
    if (!fs.existsSync(file)) return defaultValue;
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`[storage] Failed to read ${filename}:`, err);
    return defaultValue;
  }
}

export function writeJson<T>(filename: string, data: T): void {
  const file = storagePath(filename);
  const tmp = `${file}.tmp`;
  try {
    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tmp, file);
  } catch (err) {
    console.error(`[storage] Failed to write ${filename}:`, err);
    try {
      fs.appendFileSync("/tmp/admin-error.log", `${new Date().toISOString()} write ${filename}: ${err}\n`);
    } catch {}
    throw err;
  }
}

export const UPLOADS_DIR = path.join(STORAGE_DIR, "uploads");

export function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}
