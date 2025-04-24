import { Logo } from "@/components/logo";
import { Submit } from "@/components/submit";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth";
import { tgData } from "@/lib/tg-utils";
import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [name, setName] = useState(
		`${tgData.user?.first_name} ${tgData.user?.last_name}`,
	);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState(tgData.user?.username || "");
	const [referrerId, setReferrerId] = useState("");

	const signUpHandler = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const password = form.get("password") as string;
		const confirmPassword = form.get("confirmPassword") as string;

		if (password !== confirmPassword) {
			toast.error("Password mismatch");
			return;
		}

		try {
			await signUp.email(
				{ name, username, email, password, referrerId },
				{
					onError: (ctx) => {
						toast.error("Something went wrong", {
							description: ctx.error.message,
						});
					},
					onSuccess: () => navigate({ to: "/" }),
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
		<div className="w-full max-w-sm">
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
								value={name}
								onChange={(e) => setName(e.target.value)}
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<Label>Username</Label>
							<Input
								placeholder="Enter your username"
								id="username"
								value={username}
								name="username"
								required
								onChange={(e) => setUsername(e.target.value)}
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
						<div className="grid gap-2">
							<Label>Referrer?</Label>
							<Input
								placeholder="Enter referrer's username"
								id="referrerId"
								name="referrerId"
								required
								value={referrerId}
								onChange={(e) => setReferrerId(e.target.value)}
							/>
						</div>
						<Submit>Sign up</Submit>
					</form>
				</CardContent>
				<CardFooter className="text-sm">
					Already have an account?{" "}
					<Link to="/login" className={buttonVariants({ variant: "link" })}>
						Log in
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
