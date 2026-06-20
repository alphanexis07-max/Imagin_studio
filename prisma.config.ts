import { defineConfig } from "prisma/config";
import fs from "node:fs";

loadEnvFile(".env");
loadEnvFile(".env.local");

const isDbPush = process.argv.includes("db") && process.argv.includes("push");
const databaseUrl = process.env.DATABASE_URL;

if (isDbPush && !databaseUrl) {
  throw new Error(
    "DATABASE_URL is required for `prisma db push`. Add your MongoDB Atlas connection string to .env first.",
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl ?? "mongodb://localhost:27017/alphanexis",
  },
});

function loadEnvFile(path: string) {
  if (!fs.existsSync(path)) return;

  const lines = fs.readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
