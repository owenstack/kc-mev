import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import {
	ErrorComponent,
	RouterProvider,
	createRouter,
} from "@tanstack/react-router";
import { Provider } from "./components/providers";
import { Spinner } from "./components/spinner";
import { routeTree } from "./routeTree.gen";

const client = new QueryClient();

const router = createRouter({
	routeTree,
	defaultPendingComponent: () => (
		<div className={"p-2 text-2xl"}>
			<Spinner show />
		</div>
	),
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	context: {
		queryClient: client,
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
		<Provider client={client}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
