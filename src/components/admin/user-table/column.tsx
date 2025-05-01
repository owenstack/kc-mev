import { UpdateUser } from "@/components/admin/update-user";
import { Dollar } from "@/components/dollar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/auth";
import { baseURL } from "@/lib/constants";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "image",
		header: "User",
		cell: ({ row }) => {
			const user = row.original;
			return (
				<div className="flex items-center gap-4">
					<Avatar>
						<AvatarImage src={user.image} alt={user.firstName} />
						<AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<span className="font-medium">{user.firstName}</span>
						<span className="text-sm text-muted-foreground">
							@{user.username}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "balance",
		header: "Balance",
		cell: ({ row }) => <Dollar value={row.original.balance} />,
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const handleDelete = async () => {
				try {
					const response = await fetch(`${baseURL}/api/admin/delete-user`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
						body: JSON.stringify({ userId: row.original.id }),
					});

					if (!response.ok) {
						throw new Error("Failed to delete user");
					}

					toast.success("User deleted successfully");
				} catch (error) {
					toast.error("Failed to delete user");
				}
			};

			return <UpdateUser user={row.original} onDelete={handleDelete} />;
		},
	},
];
