import { useAuth } from "@/lib/auth";
import { baseURL } from "@/lib/constants";
import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
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
			toast.error("Failed to sign out");
		}
	};

	if (loading) {
		return null;
	}

	if (!user) {
		return <Button variant="outline">Connect wallet</Button>;
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
