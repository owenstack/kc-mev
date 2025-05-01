import { baseURL } from "@/lib/constants";
import { env } from "@/lib/env";
import { useNavigate } from "@tanstack/react-router";
import { LoginButton } from "@telegram-auth/react";
import { toast } from "sonner";

export function AuthButton({
	type,
}: {
	type: "signin" | "signup";
}) {
	const navigate = useNavigate();

	return (
		<LoginButton
			botUsername={env.VITE_BOT_NAME}
			onAuthCallback={async (data) => {
				try {
					const searchParams = new URLSearchParams();
					for (const [key, value] of Object.entries(data)) {
						searchParams.append(key, value.toString());
					}
					const response = await fetch(
						`${baseURL}/api/auth/${type}?${searchParams}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							credentials: "include",
						},
					);

					if (!response.ok) {
						const errorText = await response.text();
						throw new Error(errorText);
					}

					const { success, session } = await response.json();
					if (success) {
						navigate({
							to: "/",
							search: (prev) => ({
								...prev,
								session,
							}),
						});
					}
				} catch (error) {
					toast.error("Something went wrong", {
						description:
							error instanceof Error ? error.message : "Internal server error",
					});
				}
			}}
		/>
	);
}
