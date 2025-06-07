import { signOut, useSession } from "@/lib/auth";
import { env } from "@/lib/env";
import { openTelegramLink, showPopup, tgData } from "@/lib/tg-utils";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Profile() {
	const navigate = useNavigate();
	const { data: session, isPending } = useSession();

	// Check if session is loading
	if (isPending) {
		return (
			<Avatar
				className={cn(
					buttonVariants({ variant: "outline", size: "icon" }),
					"rounded-full",
				)}
			>
				<AvatarFallback>
					<Loader2 className="h-4 w-4 animate-spin" />
				</AvatarFallback>
			</Avatar>
		);
	}

	// If not authenticated and not loading, render login button
	if (!session?.session) {
		return (
			<Avatar
				className={cn(
					buttonVariants({ variant: "outline", size: "icon" }),
					"rounded-full cursor-pointer",
				)}
				onClick={() => navigate({ to: "/login" })}
			>
				<AvatarFallback>
					<User2 />
				</AvatarFallback>
			</Avatar>
		);
	}

	// User is authenticated, render dropdown menu
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					className={cn(
						buttonVariants({ variant: "outline", size: "icon" }),
						"rounded-full",
					)}
				>
					<AvatarImage src={tgData.user?.photo_url} />
					<AvatarFallback>
						<User2 />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() =>
						openTelegramLink(
							`https://t.me/${env.VITE_BOT_NAME}?start=ref=${tgData.user?.id}`,
						)
					}
				>
					Invite a friend
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
					Settings
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={async () => {
						try {
							await signOut();
							navigate({ to: "/login" });
						} catch (error) {
							showPopup({
								title: "Something went wrong",
								message:
									error instanceof Error
										? error.message
										: "Internal server error",
							});
						}
					}}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
