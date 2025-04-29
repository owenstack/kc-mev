import { type User, useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Submit } from "../submit";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function UpdateUser({ user }: { user: User }) {
	const { checkAuth, admin } = useAuth();
	const [open, setOpen] = useState(false);
	const [role, setRole] = useState<"admin" | "user">(user.role);

	const updateRole = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await admin.updateUser({ role }, user.id);
			checkAuth();
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
			>
				Update user
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new user</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={`${user.firstName} ${user.lastName || ""}`}
							readOnly
						/>
					</div>
					<form onSubmit={updateRole} className="grid gap-2">
						<Label>User role</Label>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Badge
									onClick={() => setRole("admin")}
									variant={role === "admin" ? "default" : "outline"}
									className="cursor-pointer"
								>
									Admin
								</Badge>
								<Badge
									onClick={() => setRole("user")}
									variant={role === "user" ? "default" : "outline"}
									className="cursor-pointer"
								>
									User
								</Badge>
							</div>
							<Submit>Save</Submit>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
