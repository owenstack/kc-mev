import { useAuth } from "@/lib/auth";
import { baseURL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Loader2, Settings, User2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Profile() {
	const { user, loading } = useAuth();

	const handleSignOut = async () => {
		try {
			await fetch(`${baseURL}/api/auth/signout`, {
				credentials: "include",
			});
			window.location.reload();
		} catch (error) {
			toast.error("Failed to sign out", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};

	if (loading) {
		return <Loader2 className="size-4 animate-spin" />;
	}

	if (!user) {
		return (
			<Link
				to="/"
				className={cn(
					buttonVariants({ variant: "outline", size: "icon" }),
					"rounded-full",
				)}
			>
				<User2 className="size-6" />
			</Link>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative size-8 rounded-full">
					<Avatar className="size-8">
						<AvatarImage src={user.image} alt={user.firstName} />
						<AvatarFallback>
							{user.firstName?.[0]?.toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.firstName && <p className="font-medium">{user.firstName}</p>}
						{user.username && (
							<p className="w-[200px] truncate text-sm text-muted-foreground">
								@{user.username}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						to="/settings"
						className="flex w-full items-center gap-2 text-sm"
					>
						<Settings className="size-4" />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="text-destructive focus:text-destructive"
					onClick={handleSignOut}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
