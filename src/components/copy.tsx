import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CopyCard({ text }: { text: string }) {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			toast("Copied to clipboard");
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};
	return (
		<div className="flex items-center gap-4">
			<Input value={text} readOnly />
			<Button size={"icon"} onClick={handleCopy}>
				<Copy />
			</Button>
		</div>
	);
}
