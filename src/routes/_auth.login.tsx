import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Submit } from "@/components/submit";
import { signIn } from "@/lib/auth";
import { showPopup } from "@/lib/tg-utils";
import type { ChangeEvent } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { buttonVariants, Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const signInHandler = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const username = form.get("username") as string;
		const password = form.get("password") as string;
		try {
			await signIn.username(
				{ username, password },
				{
					onError: (ctx) => {
						showPopup({
							title: "Something went wrong",
							message: ctx.error.message,
							buttons: [{ type: "close" }],
						});
					},
					onSuccess: () => navigate({ to: "/" }),
				},
			);
		} catch (error) {
			showPopup({
				title: "Something went wrong",
				message:
					error instanceof Error ? error.message : "Internal server error",
				buttons: [{ type: "close" }],
			});
		}
	};
	return (
		<div className="w-full max-w-md">
			<Logo className="left-0 mb-2" />
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Log in to access your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={signInHandler} className="grid gap-4">
						<div className="grid gap-2">
							<Label>Username</Label>
							<Input
								placeholder="Enter your username"
								id="username"
								name="username"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center justify-between">
								<Label>Password</Label>
								<Link
									to="/reset"
									className={buttonVariants({ variant: "link" })}
								>
									Forgot your password?
								</Link>
							</div>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									required
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 py-2"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4 text-primary" />
									) : (
										<Eye className="h-4 w-4 text-primary" />
									)}
								</Button>
							</div>
						</div>
						<Submit>Log in</Submit>
					</form>
				</CardContent>
				<CardFooter className="text-sm">
					Don't have an account?{" "}
					<Link to="/signup" className={buttonVariants({ variant: "link" })}>
						Sign up
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
