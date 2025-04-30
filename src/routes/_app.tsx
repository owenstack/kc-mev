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

				if (initResponse.ok) {
					// Session initialized successfully, proceed to check session
					const sessionResponse = await fetch(
						`${baseURL}/api/auth/get-session`,
						{
							credentials: "include",
						},
					);

					if (sessionResponse.ok) {
						const user = await sessionResponse.json();
						if (user) return; // User authenticated, proceed to app
					}
				}
			}

			// No session token or init failed, try regular session check
			const response = await fetch(`${baseURL}/api/auth/get-session`, {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const user = await response.json();
			return user;
		} catch (error) {
			throw new Error("Failed to check authentication");
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
