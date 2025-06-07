import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { createContext, useContext, useState, useEffect } from "react";
import { apiUrl, fetcher } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { useLaunchParams } from "@telegram-apps/sdk-react";

// Backend response validation
const queryResponse = z.object({
	role: z.string(),
	mnemonic: z.string(),
	balance: z.string(),
	walletKitConnected: z.boolean(),
	banned: z.boolean(),
	banReason: z.string().nullable(),
	banExpires: z.string().date().nullable(),
	onboarded: z.boolean(),
	referrerId: z.string().nullable(),
});

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	image: string;
	role: "user" | "admin";
	username: string;
	isPremium: boolean;
	balance: number;
	mnemonic: string | undefined;
	walletKitConnected: boolean;
	onboarded: boolean;
	referrerId: boolean;
	banned: boolean;
	banReason: string | undefined;
	banExpires: string | undefined;
}

export interface UserStore {
	user: User | null;
	setUser: (user: User) => void;
	updateTgUser: (data: Partial<User>) => void;
	updateUser: (data: Partial<User>) => void;
	clearUser: () => void;
}

interface AuthContextType {
	user: z.infer<typeof queryResponse> | null;
	loading: boolean;
	error: string | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const { tgWebAppData } = useLaunchParams();
	const { setUser } = useUserStore();

	if (!tgWebAppData) {
		throw new Error("Not launched in Telegram");
	}

	const { user } = tgWebAppData;
	const tgUser = {
		id: user?.id ?? 0,
		firstName: user?.first_name ?? "",
		lastName: user?.last_name ?? "",
		image: user?.photo_url ?? "",
		isPremium: user?.is_premium ?? false,
		username: user?.username ?? "",
		role: "user" as const,
		balance: 0,
		mnemonic: undefined,
		walletKitConnected: false,
		onboarded: false,
		referrerId: false,
		banned: false,
		banReason: undefined,
		banExpires: undefined,
	};

	const {
		data,
		isPending,
		error: resError,
	} = useQuery({
		queryKey: ["auth"],
		queryFn: async () => {
			const response = await fetcher(`${apiUrl}/api/auth/user`);
			if (!response.ok) {
				throw new Error(await response.text());
			}
			return response.json();
		},
	});

	useEffect(() => {
		if (isPending) {
			setLoading(true);
		}

		if (resError) {
			setError(resError.message);
		}

		if (data) {
			const parsedData = queryResponse.parse(data);
			setUser({ ...parsedData, ...tgUser });
		}
	}, [isPending, resError, data, setUser]);

	const value = {
		user: data ? queryResponse.parse(data) : null,
		loading,
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			updateTgUser: (data) =>
				set((state) => ({
					user: state.user ? { ...state.user, ...data } : null,
				})),
			updateUser: (data: Partial<User>) =>
				set((state) => ({
					user: state.user ? { ...state.user, ...data } : null,
				})),
			clearUser: () => set({ user: null }),
		}),
		{
			name: "user-storage",
		},
	),
);
