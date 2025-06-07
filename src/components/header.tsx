import { Share2 } from "lucide-react";
import { Logo } from "./logo";
import { Profile } from "./profile";
import { Share } from "./share";

export function Header() {
	return (
		<header className="flex items-center justify-between px-4 py-2 border-b">
			<Logo />
			<div className="flex items-center gap-2">
				<Profile />
				<Share size="icon">
					<Share2 />
				</Share>
			</div>
		</header>
	);
}
