import { useSession } from "@/lib/auth";
import { type Booster, baseURL } from "@/lib/constants";
import { addresses } from "@/lib/constants";
import { mnemonicClient } from "@/lib/viem";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";
import { Dollar } from "../dollar";
import { Button, buttonVariants } from "../ui/button";
import { CardContent } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export function PurchaseBooster({ booster }: { booster: Booster }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { data, refetch } = useSession();
	const { sendTransactionAsync } = useSendTransaction();

	const payByBalance = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${baseURL}/api/boosters/purchase`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					boosterId: booster.id,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to purchase booster");
			}

			refetch();
			toast.success("Purchase successful!", {
				description: `You have successfully purchased the booster: ${booster.name}`,
			});
			setOpen(false);
		} catch (error) {
			toast.error("Something went wrong", {
				description: error instanceof Error ? error.message : "Unknown error",
			});
		} finally {
			setLoading(false);
		}
	};

	const payByWallet = async () => {
		setLoading(true);
		try {
			const ethPriceResponse = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
			);
			const ethPriceData = await ethPriceResponse.json();
			const ethPrice = ethPriceData.ethereum.usd;
			const ethAmount = (booster.price / ethPrice).toString();
			if (data?.user.walletKitConnected) {
				await sendTransactionAsync(
					{
						to: addresses.eth as `0x${string}`,
						value: parseEther(ethAmount),
					},
					{
						onError: (error) => {
							toast.error("Something went wrong", {
								description: error.message,
							});
						},
						onSuccess: (txHash) => {
							toast.success("Fee payment successful", {
								description: `Payment complete with hash: ${txHash}`,
							});
						},
					},
				);
				const response = await fetch(`${baseURL}/api/boosters/purchase`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						boosterId: booster.id,
						useExternalPayment: true,
					}),
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.error || "Failed to purchase booster");
				}

				toast.success("Purchase successful!", {
					description: `You have successfully purchased ${booster.name}`,
				});
				setOpen(false);
				return;
			}
			if (data?.user.mnemonic) {
				const client = mnemonicClient(data.user.mnemonic);
				const txHash = await client.sendTransaction({
					to: addresses.eth as `0x${string}`,
					value: parseEther(ethAmount),
				});
				toast.success("Fee payment successful", {
					description: `Payment complete with hash: ${txHash}`,
				});
				const response = await fetch(`${baseURL}/api/boosters/purchase`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						boosterId: booster.id,
						useExternalPayment: true,
					}),
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.error || "Failed to purchase booster");
				}

				toast.success("Purchase successful!", {
					description: `You have successfully purchased ${booster.name}`,
				});
				setOpen(false);
				return;
			}
			toast.error("Something went wrong", {
				action: (
					<Link className={buttonVariants()} to="/settings">
						Add wallet
					</Link>
				),
				description: "You do not have a linked wallet",
			});
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={buttonVariants({ size: "sm" })}>
				Get
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader className="space-y-3">
					<DialogTitle className="text-2xl font-semibold">
						Purchase {booster.name}
					</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Are you sure you want to purchase this booster? You could either pay
						with your existing balance or choose to pay from your wallet.
					</DialogDescription>
				</DialogHeader>

				<CardContent className="space-y-4 pt-4">
					<div className="text-2xl font-semibold text-primary">
						<Dollar value={booster.price} />
					</div>

					<p className="text-sm font-medium text-muted-foreground">
						Choose payment method
					</p>
					<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
						<Button
							className="w-full sm:w-auto"
							variant="default"
							size="lg"
							disabled={loading}
							onClick={payByBalance}
						>
							Existing Balance
						</Button>
						<Button
							className="w-full sm:w-auto"
							variant="outline"
							size="lg"
							disabled={loading}
							onClick={payByWallet}
						>
							Wallet
						</Button>
					</div>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
}
