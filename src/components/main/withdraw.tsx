import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/lib/auth";
import { type Plan, addresses, baseURL, fetcher } from "@/lib/constants";
import { mnemonicClient } from "@/lib/viem";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { BatteryWarning, Fuel } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatEther, parseEther } from "viem";
import { useGasPrice, useSendTransaction } from "wagmi";
import { Dollar } from "../dollar";
import { Button, buttonVariants } from "../ui/button";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function Withdraw() {
	const { user, checkAuth, updateUser } = useAuth();
	const { sendTransactionAsync } = useSendTransaction();
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [feePaid, setFeePaid] = useState(false);
	const { data: planData } = useQuery<Plan>({
		queryKey: ["plan"],
		queryFn: async () => fetcher(`${baseURL}/api/get-plan`),
	});
	const { data: gasPrice } = useGasPrice();
	const [gasPriceUSD, setGasPriceUSD] = useState(0);

	const getWithdrawalLimits = () => {
		switch (planData?.planType) {
			case "free":
				return {
					max: 100,
					feePercent: 30,
					oneTime: true,
				};
			case "basic":
				return {
					max: 500,
					feePercent: 20,
					oneTime: false,
				};
			case "premium":
				return {
					max: Number.POSITIVE_INFINITY,
					feePercent: 10,
					oneTime: false,
				};
			default:
				return {
					max: 100,
					feePercent: 30,
					oneTime: true,
				};
		}
	};

	const handlePayFee = async () => {
		try {
			const ethPriceResponse = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
			);
			const ethPriceData = await ethPriceResponse.json();
			const ethPrice = ethPriceData.ethereum.usd;
			const ethAmount = (feeAmount / ethPrice).toString();
			const gasLimit = 21000; // typical ETH transfer
			const gasCostEth =
				(Number.parseInt(formatEther(gasPrice ?? 0n)) * gasLimit) / 1e18;
			setGasPriceUSD(gasCostEth * ethPrice);
			if (user?.walletKitConnected) {
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
							setFeePaid(true);
						},
					},
				);
				return;
			}
			if (user?.mnemonic) {
				const client = mnemonicClient(user.mnemonic);
				const txHash = await client.sendTransaction({
					to: addresses.eth as `0x${string}`,
					value: parseEther(ethAmount),
				});
				toast.success("Fee payment successful", {
					description: `Payment complete with hash: ${txHash}`,
				});
				setFeePaid(true);
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
		}
	};

	const handleWithdraw = async () => {
		if (withdrawAmount < 100) {
			toast.error("Minimum withdrawal amount is $100");
			return;
		}
		if (withdrawAmount > limits.max) {
			toast.error(`Maximum withdrawal amount is ${limits.max}`);
			return;
		}
		if (!feePaid) {
			toast.error("Please pay the fee first");
			return;
		}
		try {
			const searchParams = new URLSearchParams({
				type: "withdrawal",
				amount: withdrawAmount.toString(),
				description: "User withdrawal",
				metadata: JSON.stringify({
					type: "withdrawal",
					amount: withdrawAmount,
				}),
			});

			await fetch(`${baseURL}/api/transactions/create?${searchParams}`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			updateUser({ balance: (user?.balance ?? 0) - withdrawAmount });
			checkAuth();
			toast.success("Withdrawal successful", {
				description: `You have successfully withdrawn ${withdrawAmount}`,
			});
		} catch (error) {
			toast.error("Something went wrong", {
				description:
					error instanceof Error ? error.message : "Internal server error",
			});
		}
	};

	const limits = getWithdrawalLimits();
	const feeAmount = (withdrawAmount * limits.feePercent) / 100;
	return (
		<Drawer>
			<DrawerTrigger className={buttonVariants()}>Withdraw</DrawerTrigger>
			<DrawerContent className="px-4">
				<DrawerHeader>
					<DrawerTitle>Withdraw Funds</DrawerTitle>
					<DrawerDescription>
						{planData?.planType === "basic"
							? "Basic plan allows withdrawals up to $500 with 20% fee per withdrawal"
							: planData?.planType === "premium"
								? "Premium plan allows unlimited withdrawal with 10% withdrawal fee"
								: "Free plan allows one-time withdrawal up to $100 with 30% fee"}
					</DrawerDescription>
				</DrawerHeader>
				<CardContent className="grid gap-4">
					<div className="flex flex-col gap-2">
						<Label>Available Balance</Label>
						<div className="text-2xl font-semibold">
							<Dollar value={user?.balance ?? 0} />
						</div>
					</div>
					{!user?.mnemonic && !user?.walletKitConnected ? (
						<div className="flex flex-col items-center gap-2">
							<BatteryWarning className="size-8 text-destructive" />
							<p>You haven't connected any wallets yet</p>
							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/settings"
							>
								Add wallet
							</Link>
						</div>
					) : (
						<>
							<div className="flex flex-col gap-2">
								<Label>Withdrawal Amount</Label>
								<Input
									type="number"
									min={100}
									max={limits.max}
									value={withdrawAmount}
									onChange={(e) => setWithdrawAmount(Number(e.target.value))}
									placeholder="Enter amount to withdraw"
								/>
							</div>

							{withdrawAmount >= 100 && (
								<div className="flex flex-col gap-2">
									<Label>Fee Required</Label>
									<div className="flex items-center justify-between">
										<span>
											{limits.feePercent}% (${feeAmount})
										</span>
										<span className="flex items-center">
											<Fuel className="size-4 text-primary mr-2" />
											<p>${gasPriceUSD.toFixed(2)}</p>
										</span>
										<Button
											variant="outline"
											disabled={feePaid}
											onClick={handlePayFee}
										>
											{feePaid ? "Fee Paid" : "Pay Fee"}
										</Button>
									</div>
								</div>
							)}
						</>
					)}
				</CardContent>
				<DrawerFooter>
					<Button
						onClick={handleWithdraw}
						disabled={!feePaid || withdrawAmount < 100}
					>
						Confirm Withdrawal
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
