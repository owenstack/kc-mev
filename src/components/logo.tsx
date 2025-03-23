import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function Logo({ className }: { className?: string }) {
	return (
		<Link
			to="/"
			className={cn(buttonVariants({ variant: "ghost" }), className)}
		>
			Galaxy MEV
		</Link>
	);
}
