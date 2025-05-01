import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseURL } from "./constants";

export interface User {
	id: number;
	firstName: string;
	lastName: string | null;
	username: string | null;
	image: string;
	role: "user" | "admin";
	balance: number;
	mnemonic?: string;
	walletKitConnected?: boolean;
	isPremium?: boolean;
}

interface AuthState {
	user: User | null;
	loading: boolean;
	checkAuth: () => Promise<void>;
	updateUser: (data: Partial<User>) => Promise<void>;
}

export const useAuth = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			loading: false,
			checkAuth: async () => {
				try {
					set({ loading: true });
					const response = await fetch(`${baseURL}/api/auth/get-session`, {
						credentials: "include",
					});
					if (!response.ok) {
						throw new Error("Failed to get session");
					}
					const data = await response.json();
					set({ user: data.user });
				} catch (error) {
					console.error("Failed to check auth:", error);
					set({ user: null });
				} finally {
					set({ loading: false });
				}
			},
			updateUser: async (data) => {
				try {
					const response = await fetch(`${baseURL}/api/auth/update-user`, {
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					});
					if (!response.ok) {
						throw new Error("Failed to update user");
					}
					const { user } = await response.json();
					set({ user });
				} catch (error) {
					console.error("Failed to update user:", error);
					throw error;
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({ user: state.user }),
		},
	),
);
