import { Header } from "@/components/header";
import { useAuth } from "@/lib/auth";
import { baseURL } from "@/lib/constants";
import { ready } from "@/lib/tg-utils";
import type { AppSearchParams } from "@/lib/types";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_app")({
	validateSearch: (search): AppSearchParams => ({
		session: typeof search.session === "string" ? search.session : undefined,
	}),
	beforeLoad: async ({ search }) => {
		if (search.session) {
			try {
				await fetch(`${baseURL}/api/auth/init?session=${search.session}`, {
					credentials: "include",
				});
			} catch (error) {
				console.error("Failed to initialize session:", error);
			}
			throw redirect({
				to: "/",
				search: {},
			});
		}
		return {};
	},
	component: AppLayout,
});

function AppLayout() {
	const { checkAuth } = useAuth();

	useEffect(() => {
		ready();
		checkAuth();
	}, [checkAuth]);

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 container mx-auto py-8">
				<Outlet />
			</main>
		</div>
	);
}
