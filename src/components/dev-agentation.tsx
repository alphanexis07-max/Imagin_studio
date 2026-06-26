import { lazy, Suspense } from "react";

const AgentationPanel = import.meta.env.DEV
  ? lazy(() => import("agentation").then((mod) => ({ default: mod.Agentation })))
  : null;

export function DevAgentation() {
  if (!AgentationPanel) return null;

  return (
    <Suspense fallback={null}>
      <AgentationPanel />
    </Suspense>
  );
}