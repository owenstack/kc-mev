import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { admin } from "@/lib/auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Submit } from "../submit";
import { useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "../ui/button";
import type { UserWithRole } from "better-auth/plugins/admin";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth";
import { Badge } from "../ui/badge";

export function UpdateUser({ user }: { user: UserWithRole }) {
	const { refetch } = useSession();
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<"admin" | "user" | string>(
		user.role as string,
	);

	const updateRole = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await admin.setRole(
				{ userId: user.id, role },
				{
					onError: (ctx) => {
						toast.error("Something went wrong", {
							description: ctx.error.message,
						});
					},
					onSuccess: () => {
						refetch();
						toast.success("Role updated successfully");
					},
				},
			);
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};

	const updatePassword = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await admin.setUserPassword(
				{ userId: user.id, newPassword: password },
				{
					onError: (ctx) => {
						toast.error("Something went wrong", {
							description: ctx.error.message,
						});
					},
					onSuccess: () => {
						toast.success("Password updated successfully");
					},
				},
			);
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
						<Input id="name" name="name" value={user.name} readOnly />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={user.email}
							readOnly
						/>
					</div>
					<form onSubmit={updatePassword} className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<div className="grid grid-cols-6 gap-4">
							<Input
								id="password"
								name="password"
								value={password}
								className="col-span-5"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Submit>Save</Submit>
						</div>
					</form>
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
