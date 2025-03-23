import { Header } from "@/components/header";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { baseURL } from "@/lib/constants";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		try {
			const response = await fetch(`${baseURL}/api/auth/get-session`, {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			if (!data?.session) {
				throw redirect({
					to: "/login",
					search: location.href,
				});
			}
		} catch (error) {
			throw redirect({
				to: "/login",
				search: location.href,
			});
		}
	},
});

function RouteComponent() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}
