import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
	RouterProvider,
	createRouter,
	ErrorComponent,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Spinner } from "./components/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	defaultPendingComponent: () => (
		<div className={"p-2 text-2xl"}>
			<Spinner show />
		</div>
	),
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	context: {
		queryClient,
	},
	defaultPreload: "intent",
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(
	document.getElementById("root") || document.createElement("div"),
).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
