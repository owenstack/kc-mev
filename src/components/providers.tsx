import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { ReactNode } from "react";
import { http, WagmiProvider, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { ThemeProvider } from "./theme-provider";

const config = createConfig(
	getDefaultConfig({
		chains: [mainnet],
		transports: {
			// RPC URL for each chain
			[mainnet.id]: http(),
		},
		// Required API Keys
		walletConnectProjectId: env.VITE_FAMILY_PROJECT_ID,
		// Required App Info
		appName: "Galaxy MEV",
	}),
);
export const Provider = ({
	children,
	client,
}: { children: ReactNode; client: QueryClient }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<ConnectKitProvider>
					<ThemeProvider defaultTheme="system" storageKey="theme">
						{children}
						<Toaster richColors />
					</ThemeProvider>
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
