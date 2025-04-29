import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Submit } from "../submit";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function UpdateUser() {
	const { updateUser, checkAuth, user } = useAuth();
	const updateHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const username = form.get("username") as string;
		try {
			await updateUser({ username });
			checkAuth();
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>
					Update your personal details and profile settings
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<form onSubmit={updateHandler} className="grid gap-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							defaultValue={user?.username ?? ""}
							placeholder="Your username"
						/>
					</div>
					<Submit>Save changes</Submit>
				</form>
			</CardContent>
		</Card>
	);
}
