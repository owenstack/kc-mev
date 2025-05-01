import { UserTable } from "@/components/admin/user-table";
import { useAuth } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin")({
	beforeLoad: () => {
		const auth = useAuth.getState();
		if (!auth.user || auth.user.role !== "admin") {
			throw redirect({
				to: "/",
			});
		}
	},
	component: AdminPage,
});

function AdminPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
			<UserTable />
		</div>
	);
}
