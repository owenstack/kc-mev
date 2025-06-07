import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { App } from "@/components/App";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { publicUrl } from "@/helpers/publicUrl";
import { mainnet } from "wagmi/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth";

const client = new QueryClient();

const config = createConfig(
	getDefaultConfig({
		chains: [mainnet],
		transports: {
			// RPC URL for each chain
			[mainnet.id]: http(),
		},
		// Required API Keys
		walletConnectProjectId: import.meta.env.VITE_FAMILY_PROJECT_ID,
		// Required App Info
		appName: "Galaxy MEV",
	}),
);

function ErrorBoundaryError({ error }: { error: unknown }) {
	return (
		<div>
			<p>An unhandled error occurred:</p>
			<blockquote>
				<code>
					{error instanceof Error
						? error.message
						: typeof error === "string"
							? error
							: JSON.stringify(error)}
				</code>
			</blockquote>
		</div>
	);
}

export function Root() {
	return (
		<ErrorBoundary fallback={ErrorBoundaryError}>
			<TonConnectUIProvider manifestUrl={publicUrl("tonconnect-manifest.json")}>
				<WagmiProvider config={config}>
					<QueryClientProvider client={client}>
						<ConnectKitProvider>
							<AuthProvider>
								<App />
							</AuthProvider>
						</ConnectKitProvider>
					</QueryClientProvider>
				</WagmiProvider>
			</TonConnectUIProvider>
		</ErrorBoundary>
	);
}
