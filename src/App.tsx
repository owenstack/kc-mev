import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import WebApp from "@twa-dev/sdk";
import { env } from "@/lib/env";

WebApp.ready();

function App() {
	const [count, setCount] = useState(0);
	const userId = WebApp.initData.split("=")[1];

	return (
		<main className="flex flex-col gap-4 items-center justify-center h-screen">
			<h1>Galaxy MEV Bot</h1>
			<div>
				<Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
				<Button
					onClick={() => {
						WebApp.openTelegramLink(
							`https://t.me/share/url?url=https://t.me/${env.VITE_BOT_NAME}?start=ref=${userId}`,
						);
					}}
				>
					Invite a friend
				</Button>
			</div>
		</main>
	);
}

export default App;
