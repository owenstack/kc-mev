import { Spinner } from "@/components/spinner";
import { DataTable } from "@/components/ui/data-table";
import { baseURL, fetcher } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column";
import type { User } from "@/lib/auth";

export function UserTable() {
	const { data } = useQuery<User[]>({
		queryKey: ["admin-users"],
		queryFn: () => fetcher(`${baseURL}/api/admin/users`),
	});

	return (
		<div className="container mx-auto py-10 max-w-sm">
			{data ? <DataTable columns={columns} data={data} /> : <Spinner show />}
		</div>
	);
}
