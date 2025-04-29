import { useAuth } from "@/lib/auth";
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
	const { user, loading, checkAuth } = useAuth();
	return (
		<Card className="w-full max-w-sm md:max-w-md">
			<CardHeader className="flex item-center justify-between">
				<div>
					<CardTitle className="text-4xl">
						<Dollar value={user?.balance ?? 0} />
					</CardTitle>
					<CardDescription className="flex items-center">
						Earned balance
						<Button
							variant="ghost"
							size={"icon"}
							className="ml-2"
							onClick={() => checkAuth()}
							disabled={loading}
						>
							{loading ? (
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
