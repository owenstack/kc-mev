import { Spinner } from "@/components/spinner";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { baseURL, type CustomUser, fetcher } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function UserTable() {
	const { data } = useQuery<CustomUser[]>({
		queryKey: ["admin-users"],
		queryFn: () => fetcher(`${baseURL}/api/admin/users`),
	});

	return (
		<div className="container mx-auto py-10 max-w-sm">
			{data ? <DataTable columns={columns} data={data} /> : <Spinner show />}
		</div>
	);
}
