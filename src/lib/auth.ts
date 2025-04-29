import { useNavigate } from "@tanstack/react-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetcher } from "./constants";
import { baseURL } from "./constants";

export interface User {
	id: number;
	firstName: string;
	lastName: string | null;
	image: string | null;
	role: "user" | "admin";
	username: string | null;
	isPremium: boolean | null;
	balance: number;
	mnemonic: string | null;
	walletKitConnected: boolean;
	referrerId: string | null;
	banned: boolean;
	banReason: string | null;
	banExpires: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface Session {
	id: string;
	userId: number;
	createdAt: Date;
	expiresAt: Date;
	impersonatedBy: number | null;
	updatedAt: Date;
}

export interface AuthResponse {
	session: Session | null;
	user: User | null;
	error: string | null;
}

export interface AuthStore {
	user: User | null;
	session: Session | null;
	loading: boolean;
	checkAuth: () => Promise<void>;
	updateUser: (user: Partial<User>) => Promise<void>;
	signOut: () => Promise<void>;
	admin: {
		updateUser: (user: Partial<User>, userId: number) => Promise<void>;
		deleteUser: (userId: number) => Promise<void>;
	};
}

export const useAuth = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			session: null,
			loading: true,
			checkAuth: async () => {
				try {
					const data: AuthResponse = await fetcher(
						`${baseURL}/api/auth/get-session`,
					);
					set({
						user: data.user,
						session: data.session,
						loading: false,
					});
				} catch (error) {
					set({
						user: null,
						session: null,
						loading: false,
					});
				}
			},
			signOut: async () => {
				const navigate = useNavigate();
				try {
					await fetch(`${baseURL}/api/auth/signout`, {
						method: "POST",
						credentials: "include",
					});
					set({
						user: null,
						session: null,
						loading: false,
					});
					navigate({ to: "/login" });
				} catch (error) {
					console.error("Error signing out:", error);
					throw error;
				}
			},
			updateUser: async (userData: Partial<User>) => {
				try {
					const response = await fetch(`${baseURL}/api/auth/update-user`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
						credentials: "include",
					});

					if (!response.ok) {
						throw new Error("Failed to update user");
					}

					set((state) => ({
						user: state.user ? { ...state.user, ...userData } : null,
					}));
				} catch (error) {
					console.error("Error updating user:", error);
					throw error;
				}
			},
			admin: {
				updateUser: async (userData: Partial<User>, userId: number) => {
					try {
						const data = {
							...userData,
							userId,
						};
						const response = await fetch(`${baseURL}/api/admin/update-user`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(data),
							credentials: "include",
						});

						if (!response.ok) {
							const error = await response.text();
							throw new Error(error || "Failed to update user");
						}

						const result = await response.json();
						return result;
					} catch (error) {
						console.error("Error updating user:", error);
						throw error;
					}
				},
				deleteUser: async (userId: number) => {
					try {
						const response = await fetch(`${baseURL}/api/admin/delete-user`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(userId),
							credentials: "include",
						});
						if (!response.ok) {
							const error = await response.text();
							throw new Error(error || "Failed to delete user");
						}

						const result = await response.json();
						return result;
					} catch (error) {
						console.error("Error updating user:", error);
						throw error;
					}
				},
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
