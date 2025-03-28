import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Submit } from "@/components/submit";
import { signUp } from "@/lib/auth";
import { useNavigate, Link } from "@tanstack/react-router";
import type { ChangeEvent } from "react";
import { buttonVariants, Button } from "@/components/ui/button";
import { showPopup } from "@/lib/tg-utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const signUpHandler = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const name = form.get("name") as string;
		const email = form.get("email") as string;
		const username = form.get("username") as string;
		const password = form.get("password") as string;
		const confirmPassword = form.get("confirmPassword") as string;

		if (password !== confirmPassword) {
			showPopup({
				title: "Password Mismatch",
				message: "Password and confirm password do not match",
				buttons: [{ type: "close" }],
			});
			return;
		}

		try {
			await signUp.email(
				{ name, username, email, password },
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
			<Logo className="right-0 mb-2" />
			<Card>
				<CardHeader>
					<CardTitle>Sign up</CardTitle>
					<CardDescription>Sign up to access all the features</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={signUpHandler} className="grid gap-4">
						<div className="grid gap-2">
							<Label>Name</Label>
							<Input
								placeholder="Your full name"
								id="name"
								name="name"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label>Email address</Label>
							<Input
								placeholder="Enter your email address"
								id="email"
								name="email"
								type="email"
								required
							/>
						</div>
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
							<Label>Password</Label>
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
						<div className="grid gap-2">
							<Label>Confirm Password</Label>
							<div className="relative">
								<Input
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									name="confirmPassword"
									required
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute right-0 top-0 h-full px-3 py-2"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4 text-primary" />
									) : (
										<Eye className="h-4 w-4 text-primary" />
									)}
								</Button>
							</div>
						</div>
						<Submit>Sign up</Submit>
					</form>
				</CardContent>
				<CardFooter className="text-sm">
					Already have an account?{" "}
					<Link to="/login" className={buttonVariants({ variant: "link" })}>
						Sign up
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
