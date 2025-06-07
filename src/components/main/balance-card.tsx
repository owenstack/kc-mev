import { useSession } from "@/lib/auth";
import { RefreshCw } from "lucide-react";
import { Dollar } from "../dollar";
import { Button } from "../ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Withdraw } from "./withdraw";

export function BalanceCard() {
	const { data, isPending, refetch } = useSession();
	return (
		<Card className="w-full max-w-sm md:max-w-md">
			<CardHeader className="flex item-center justify-between">
				<div>
					<CardTitle className="text-4xl">
						<Dollar value={data?.user.balance ?? 0} />
					</CardTitle>
					<CardDescription className="flex items-center">
						Earned balance
						<Button
							variant="ghost"
							size={"icon"}
							className="ml-2"
							onClick={() => refetch()}
							disabled={isPending}
						>
							{isPending ? (
								<RefreshCw className="size-4 animate-spin" />
							) : (
								<RefreshCw className="size-4" />
							)}
						</Button>
					</CardDescription>
				</div>
				<CardAction>
					<Withdraw />
				</CardAction>
			</CardHeader>
		</Card>
	);
}
