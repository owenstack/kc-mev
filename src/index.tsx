// Include Telegram UI styles first to allow our code override the package CSS.
import "@telegram-apps/telegram-ui/dist/styles.css";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { Root } from "@/components/Root";
import { EnvUnsupported } from "@/components/EnvUnsupported";
import { init } from "@/init";

import "./index.css";

// Mock the environment in case, we are outside Telegram.
import "./mockEnv";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

try {
	const launchParams = retrieveLaunchParams();
	const { tgWebAppPlatform: platform } = launchParams;
	const debug =
		(launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
		import.meta.env.DEV;

	// Configure all application dependencies.
	await init({
		debug,
		eruda: debug && ["ios", "android"].includes(platform),
		mockForMacOS: platform === "macos",
	}).then(() => {
		root.render(
			<StrictMode>
				<Root />
			</StrictMode>,
		);
	});
} catch (e) {
	root.render(<EnvUnsupported />);
}
