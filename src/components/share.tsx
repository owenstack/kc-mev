import { Button } from "./ui/button";
import { openTelegramLink, userId } from "@/lib/tg-utils";
import { env } from "@/lib/env";
import type { ButtonProps } from "@/lib/constants";

export function Share({ children, variant, size, className }: ButtonProps) {
	return (
		<Button
			variant={variant}
			size={size}
			onClick={() => {
				openTelegramLink(
					`https://t.me/share/url?url=https://t.me/${env.VITE_BOT_NAME}?start=ref=${userId}`,
				);
			}}
			className={className}
		>
			{children}
		</Button>
	);
}
