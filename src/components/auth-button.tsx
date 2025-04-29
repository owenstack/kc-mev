import { baseURL } from "@/lib/constants";
import { env } from "@/lib/env";
import { useNavigate } from "@tanstack/react-router";
import { LoginButton } from "@telegram-auth/react";
import { toast } from "sonner";

export function AuthButton({
	type,
	callbackUrl = "/",
}: { type: "login" | "signup"; callbackUrl?: string }) {
	const navigate = useNavigate();
	return (
		<LoginButton
			botUsername={env.VITE_BOT_NAME}
			onAuthCallback={async (data) => {
				try {
					const response = await fetch(`${baseURL}/api/auth/${type}`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (!response.ok) {
						const errorText = await response.text();
						throw new Error(errorText);
					}

					const result = await response.json();
					if (result.success) {
						return navigate({ to: callbackUrl });
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
