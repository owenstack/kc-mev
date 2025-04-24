import { Submit } from "@/components/submit";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

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
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};
	return (
		<Card className="w-full max-w-sm">
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
