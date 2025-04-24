import { updateUser, useSession } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Submit } from "../submit";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function LocalWalletDialog() {
	const [mnemonic, setMnemonic] = useState("");
	const { refetch, data } = useSession();

	const handleMnemonicSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		if (!mnemonic) {
			toast.error("Please enter your mnemonic phrase");
			return;
		}
		try {
			await updateUser({ mnemonic });
			refetch();
			toast.success("Mnemonic phrase saved successfully");
		} catch (error) {
			toast.error("Failed to save mnemonic phrase");
		}
	};

	return (
		<Dialog>
			<DialogTrigger>Save Passphrase</DialogTrigger>
			<DialogContent>
				{data?.user.mnemonic ? (
					<>Something</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle>Enter your passphrase</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							Enter your passphrase to link you account using your passphrase.
							Your passphrase is encrypted and securely stored in servers
							overseas.
						</DialogDescription>
						<form onSubmit={handleMnemonicSubmit} className="grid gap-2">
							<Label>Enter pass phrase</Label>
							<Textarea
								value={mnemonic}
								onChange={(e) => setMnemonic(e.target.value)}
								placeholder="Enter your 12 or 24 word passphrase"
							/>
							<Submit>Save phrase</Submit>
						</form>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
