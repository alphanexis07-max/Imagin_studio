import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { loginAdmin } from "@/lib/admin/auth.functions";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError("");
    try {
      await loginAdmin({ data: { password } });
      router.navigate({ to: "/admin" });
    } catch (err: unknown) {
      const msg = (err as Error).message ?? "";
      if (msg.includes("RATE_LIMITED")) {
        const secs = msg.split(":")[1];
        setError(`Too many attempts. Try again in ${secs}s.`);
      } else {
        setError("Wrong password. Try again.");
      }
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        animate={shaking ? { x: [-8, 8, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-[1.5rem] border-2 border-ink bg-card p-8 shadow-[6px_6px_0_0_var(--ink)]">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream font-display text-xl font-bold">
              H.
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="mt-1 text-sm text-muted-foreground">Alphanexis.studio dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="pw">
                Password
              </label>
              <input
                id="pw"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive font-medium"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Single shared password. Rotate by editing <code>.env</code> and restarting.
        </p>
      </motion.div>
    </div>
  );
}
