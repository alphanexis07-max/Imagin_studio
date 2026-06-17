import { createFileRoute, Outlet } from "@tanstack/react-router";

// The /admin parent route just renders its children.
// Auth guarding is done inside each child route that needs it.
export const Route = createFileRoute("/admin")({
  component: () => <Outlet />,
});
