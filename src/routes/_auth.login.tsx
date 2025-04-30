import { AuthButton } from "@/components/auth-button";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="w-full max-w-sm">
			<Logo className="left-0 mb-2" />
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Log in to access your account</CardDescription>
				</CardHeader>
				<CardContent>
					<AuthButton type="signin" />
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
