import { Header } from "@/components/header";
import { AuthInit } from "@/lib/auth";
import { baseURL } from "@/lib/constants";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

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

			const user = await response.json();

			if (!user) {
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
			<AuthInit />
			<Outlet />
		</div>
	);
}
