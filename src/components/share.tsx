import type { ButtonProps } from "@/lib/constants";
import { env } from "@/lib/env";
import { openTelegramLink, tgData } from "@/lib/tg-utils";
import { Button } from "./ui/button";

export function Share({ children, variant, size, className }: ButtonProps) {
	return (
		<Button
			variant={variant}
			size={size}
			onClick={() => {
				openTelegramLink(
					`https://t.me/share/url?url=https://t.me/${env.VITE_BOT_NAME}?start=ref=${tgData.user?.id}`,
				);
			}}
			className={className}
		>
			{children}
		</Button>
	);
}
