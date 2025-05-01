import { AuthButton } from "@/components/auth-button";
import { BalanceCard } from "@/components/main/balance-card";
import { LiveChart } from "@/components/main/live-chart";
import { MultiplierCard } from "@/components/main/multipliers-card";
import { useAuth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: IndexPage,
});

function IndexPage() {
	const { user, loading } = useAuth();

	if (loading) return null;

	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-4xl font-bold">Welcome to Galaxy MEV</h1>
				<p className="text-muted-foreground">
					Sign in with Telegram to start earning
				</p>
				<AuthButton type="signin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<BalanceCard />
			<LiveChart />
			<MultiplierCard />
		</div>
	);
}
