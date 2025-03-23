import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Submit } from "@/components/submit";
import { resetPassword } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { useState, type ChangeEvent } from "react";
import { showPopup } from "@/lib/tg-utils";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";

export const Route = createFileRoute("/_auth/reset")({
	component: RouteComponent,
});

function RouteComponent() {
	const [token, setToken] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const reset = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const newPassword = form.get("new-password") as string;
		try {
			await resetPassword({ token, newPassword });
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
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Reset your password</CardTitle>
				<CardDescription>
					Send the command: `/reset-password` to get a token to reset your
					password
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={reset} className="grid gap-4">
					<div className="grid gap-2">
						<Label>Generated token</Label>
						<InputOTP
							maxLength={6}
							value={token}
							onChange={(token) => setToken(token)}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
							</InputOTPGroup>
							<InputOTPSeparator />
							<InputOTPGroup>
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>
					<div className="grid gap-2">
						<Label>New password</Label>
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
					<Submit>Reset</Submit>
				</form>
			</CardContent>
		</Card>
	);
}
