import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex min-h-screen items-center justify-center">
			<Outlet />
		</main>
	);
}
