import Telegram from "@/assets/icons";
import { Preferences } from "@/components/settings/preferences";
import { UpdateUser } from "@/components/settings/update-user";
import { UpdateWallet } from "@/components/settings/update-wallet";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { tgData } from "@/lib/tg-utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto flex flex-col items-center py-8 space-y-6">
			<h1 className="text-3xl font-bold">Account Settings</h1>
			<UpdateUser />
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Telegram Details</CardTitle>
					<CardDescription>
						Manage your Telegram account connection
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Telegram className="size-6" />
							<div>
								<p className="font-medium">Connected to Telegram</p>
								<p className="text-sm text-gray-500">
									@{tgData.user?.username}
								</p>
								{tgData.user?.is_premium ? (
									<p>Telegram premium user</p>
								) : (
									<p>Not using Telegram premium</p>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<UpdateWallet />
			<Preferences />
		</div>
	);
}
