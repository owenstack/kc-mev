import { baseURL } from "@/lib/constants";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { UserTable } from "@/components/admin/user-table";
import { CreateUser } from "@/components/admin/create-user";

export const Route = createFileRoute("/_app/admin")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		try {
			const response = await fetch(`${baseURL}/api/auth/get-session`, {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			if (data?.user.role !== "admin") {
				throw redirect({
					to: "/",
					search: location.href,
				});
			}
		} catch (error) {
			throw redirect({
				to: "/",
				search: location.href,
			});
		}
	},
});

function RouteComponent() {
	return (
		<main className="flex flex-col items-center gap-4">
			<CreateUser />
			<UserTable />
		</main>
	);
}
