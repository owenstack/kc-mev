import type { ReactNode } from "react";
import { env } from "./env";

export interface ButtonProps {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
	children: ReactNode;
}

export const baseURL =
	process.env.NODE_ENV === "development"
		? env.VITE_DEV_API_URL
		: env.VITE_PROD_API_URL;
