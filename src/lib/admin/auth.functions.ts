import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, getRequest, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  checkRateLimit,
  verifyPassword,
  clearRateLimit,
  createSessionCookie,
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

    clearRateLimit(ip);
    const value = createSessionCookie();
    setCookie("admin_session", value, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return { success: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("admin_session", { path: "/" });
  return { success: true };
});

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const value = getCookie("admin_session");
  return { loggedIn: verifySessionValue(value ?? "") };
});
