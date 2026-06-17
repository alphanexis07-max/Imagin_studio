import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  // Vercel's TanStack Start adapter expects Nitro in the Vite plugin chain so
  // the deployment gets server routes/functions instead of only static assets.
  plugins: [tanstackStart({ server: { entry: "server" } }), nitro(), viteReact()],
});
