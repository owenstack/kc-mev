import { BalanceCard } from "@/components/main/balance-card";
import { LiveChart } from "@/components/main/live-chart";
import { MultiplierCard } from "@/components/main/multipliers-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="flex flex-col items-center gap-4">
			<LiveChart />
			<BalanceCard />
			<MultiplierCard />
		</main>
	);
}
