import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { buttonVariants } from "./ui/button";

export function Logo({ className }: { className?: string }) {
	return (
		<Link
			to="/"
			className={cn(buttonVariants({ variant: "ghost" }), className)}
		>
			<Star className="text-primary items-baseline" />
			Galaxy
		</Link>
	);
}
