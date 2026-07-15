import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Loader } from "@/components/ui/loader";
import { DevAgentation } from "@/components/dev-agentation";
import logo from "@/assets/logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for has been moved or is no longer available.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page did not load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something interrupted the page. Refresh or return to the studio homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Imagine Design Studio - Architecture & Interior Design Studio" },
      {
        name: "description",
        content:
          "Imagine Design Studio creates refined architecture, interiors, and urban design for residential, commercial, and cultural projects.",
      },
      { name: "author", content: "Imagine Design Studio" },
      { property: "og:title", content: "Imagine Design Studio - Architecture & Interior Design Studio" },
      {
        property: "og:description",
        content:
          "Architecture, interiors, urban planning, and sustainable design shaped with craft, clarity, and client collaboration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://alphanexis.vercel.app/" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Imagine Design Studio - Architecture & Interior Design Studio" },
      {
        name: "twitter:description",
        content:
          "Architecture, interiors, urban planning, and sustainable design shaped with craft, clarity, and client collaboration.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Caveat:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme-preference");var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [loaderExiting, setLoaderExiting] = useState(false);

  useEffect(() => {
    const minVisibleMs = 950;
    const maxVisibleMs = 2600;
    const startedAt = performance.now();
    let hidden = false;
    let fallbackTimer: ReturnType<typeof window.setTimeout>;
    let settleTimer: ReturnType<typeof window.setTimeout>;
    let removeTimer: ReturnType<typeof window.setTimeout>;

    const hideLoader = () => {
      if (hidden) return;
      hidden = true;
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minVisibleMs - elapsed);
      settleTimer = window.setTimeout(() => {
        setLoaderExiting(true);
        removeTimer = window.setTimeout(() => setShowInitialLoader(false), 320);
      }, remaining);
    };

    if (document.readyState === "complete") {
      window.requestAnimationFrame(() => window.requestAnimationFrame(hideLoader));
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    fallbackTimer = window.setTimeout(hideLoader, maxVisibleMs);

    return () => {
      window.removeEventListener("load", hideLoader);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(settleTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {showInitialLoader ? <InitialLoadingOverlay isExiting={loaderExiting} /> : null}
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <DevAgentation />
    </QueryClientProvider>
  );
}

function InitialLoadingOverlay({ isExiting }: { isExiting: boolean }) {
  return (
    <div className={`initial-loader-overlay${isExiting ? " is-exiting" : ""}`} aria-busy="true">
      <div className="initial-loader-panel">
        <img src={logo} alt="" className="initial-loader-logo" aria-hidden="true" />
        <Loader />
        <p className="initial-loader-copy">Preparing Imagine Design Studio</p>
      </div>
    </div>
  );
}
