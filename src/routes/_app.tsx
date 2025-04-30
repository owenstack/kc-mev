import { Header } from "@/components/header";
import { AuthInit } from "@/lib/auth";
import { baseURL } from "@/lib/constants";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		try {
			// Check for session token in URL first
			const sessionToken = new URLSearchParams(location.search).get("session");
			if (sessionToken) {
				const initResponse = await fetch(
					`${baseURL}/api/auth/init?session=${sessionToken}`,
					{
						credentials: "include",
					},
				);

				if (!initResponse.ok) {
					throw new Error("Failed to initialize session");
				}
				const initData = await initResponse.json();
				if (!initData.success) {
					throw new Error(initData.error || "Failed to initialize session");
				}
				// After successful init, get session
				const sessionResponse = await fetch(`${baseURL}/api/auth/get-session`, {
					credentials: "include",
				});
				if (!sessionResponse.ok) {
					throw new Error("Failed to get session");
				}
				const user = await sessionResponse.json();
				return user;
			}

			// No session token, try regular session check
			const response = await fetch(`${baseURL}/api/auth/get-session`, {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const user = await response.json();
			return user;
		} catch (error) {
			throw new Error(
				error instanceof Error
					? error.message
					: "Failed to check authentication",
			);
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
