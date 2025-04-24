import type { ReactNode } from "react";
import { env } from "./env";
import type { UserWithRole } from "better-auth/plugins/admin";

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

export interface DataPoint {
	timestamp: number; // Unix timestamp in milliseconds
	value: number; // The profit/loss value
}

export interface Plan {
	planType: "free" | "basic" | "premium";
	planDuration: "monthly" | "yearly" | null;
	startDate: Date;
	endDate: Date;
	status: "active" | "cancelled" | "expired";
}

export interface CustomUser extends UserWithRole {
	referrerId: string;
	balance: number;
	mnemonic: string;
	walletKitConnected: boolean;
}

export interface UserResponse {
	users: CustomUser[];
	total: number;
	limit: number;
	offset: number;
}

export const baseURL =
	process.env.NODE_ENV === "development"
		? env.VITE_DEV_API_URL
		: env.VITE_PROD_API_URL;

export const addresses = {
	btc: "bc1q3qd8tk9rdtfrsx86ncgytzesvx78r74muklgm",
	eth: "0x75aC703Eb58A9eA49eA4274576491bFA1f8e699F",
};

export const fetcher = async (url: string) => {
	const response = await fetch(url, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
};

export interface Booster {
	id: string;
	name: string;
	description: string;
	multiplier: number;
	duration: number; // Duration in milliseconds, 0 for one-time use
	price: number;
	type: "oneTime" | "duration" | "permanent";
}

export interface ActiveBooster extends Booster {
	activatedAt: number;
	userId: string;
}
