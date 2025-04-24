import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { admin } from "@/lib/auth";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Submit } from "../submit";
import { useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function CreateUser() {
	const [open, setOpen] = useState(false);
	const [role, setRole] = useState<"admin" | "user">("user");
	const createHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const name = form.get("name") as string;
		const email = form.get("email") as string;
		const password = form.get("password") as string;
		try {
			await admin.createUser(
				{
					name,
					password,
					email,
					role,
				},
				{
					onError: (ctx) => {
						toast.error("Something went wrong", {
							description: ctx.error.message,
						});
					},
				},
			);
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		} finally {
			setOpen(false);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				className={cn(buttonVariants(), "place-self-start mt-4 ml-4")}
			>
				<Plus />
				User
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new user</DialogTitle>
				</DialogHeader>
				<form onSubmit={createHandler} className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" name="name" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email address</Label>
						<Input id="email" name="email" type="email" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" name="password" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="role">Role</Label>
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
					</div>
					<Submit>Create</Submit>
				</form>
			</DialogContent>
		</Dialog>
	);
}
