import { useAuth } from "@/lib/auth";
import { env } from "@/lib/env";
import { openTelegramLink } from "@/lib/tg-utils";
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
	const { session, loading, user } = useAuth();

	// Check if user is loading
	if (loading) {
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
	if (!session) {
		return (
			<Avatar
				className={cn(
					buttonVariants({ variant: "outline", size: "icon" }),
					"rounded-full cursor-pointer",
				)}
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
					<AvatarImage src={user?.image ?? ""} />
					<AvatarFallback>
						<User2 />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() =>
						openTelegramLink(
							`https://t.me/${env.VITE_BOT_NAME}?start=ref=${user?.id}`,
						)
					}
				>
					Invite a friend
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
					Settings
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
