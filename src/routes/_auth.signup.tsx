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

export const Route = createFileRoute("/_auth/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="w-full max-w-sm">
			<Logo className="right-0 mb-2" />
			<Card>
				<CardHeader>
					<CardTitle>Sign up</CardTitle>
					<CardDescription>Sign up to access all the features</CardDescription>
				</CardHeader>
				<CardContent>
					<AuthButton type="signup" />
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
