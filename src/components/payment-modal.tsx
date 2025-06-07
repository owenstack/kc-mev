import {
	Modal,
	Cell,
	IconButton,
	Text,
	Headline,
} from "@telegram-apps/telegram-ui";
import { ConnectKitButton } from "connectkit";
import { Wallet, ChevronRight } from "lucide-react";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export function PaymentModal({
	open = false,
	setOpen,
	amount,
}: { open: boolean; setOpen?: (open: boolean) => void; amount?: number }) {
	const { tgWebAppPlatform: platform } = useLaunchParams();
	const apple = platform === "ios" || platform === "macos";
	return (
		<Modal
			onOpenChange={setOpen}
			open={open}
			className="w-full flex items-center place-self-center-safe"
		>
			<Modal.Header>Set up a payment method</Modal.Header>
			{!apple && <Headline>Set up a payment method</Headline>}
			<div className="grid gap-4 p-4 w-full max-w-sm">
				<Cell className="flex items-center justify-between gap-4 rounded-lg">
					<div className="flex items-center gap-2">
						<IconButton>
							<Wallet />
						</IconButton>
						<Text>DEX wallet</Text>
					</div>
					<ChevronRight className="text-gray-500" />
				</Cell>
				<Cell>CEX wallet</Cell>
				<ConnectKitButton />
			</div>
		</Modal>
	);
}
