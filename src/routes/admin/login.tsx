import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { loginAdmin } from "@/lib/admin/auth.functions";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xl font-bold">
              A
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="mt-1 text-sm text-muted-foreground">Imagine Design Studio portfolio dashboard</p>
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
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
            >
              {loading ? "Checking..." : "Enter"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Single shared password. Rotate it by editing <code>.env</code> and restarting the server.
        </p>
      </div>
    </div>
  );
}
