import type { ColumnDef } from "@tanstack/react-table";
import type { CustomUser } from "@/lib/constants";
import { Dollar } from "@/components/dollar";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { admin } from "@/lib/auth";
import { UpdateUser } from "../update-user";

export const columns: ColumnDef<CustomUser>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const value = row.getValue("name") as string;
			const name = value.split(" ")[0];
			return <div>{name}</div>;
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			const value = row.getValue("email") as string;
			const first = value.split("@")[0].slice(0, 5);
			const end = value.split("@")[1];
			const email = `${first}...@${end}`;
			return <div className="font-medium text-gray-500">{email}</div>;
		},
	},
	{
		accessorKey: "balance",
		header: "Balance",
		cell: ({ row }) => {
			const value = Number.parseFloat(row.getValue("balance"));
			return (
				<div className="font-medium text-lg">
					<Dollar value={value} />
				</div>
			);
		},
	},
	{
		accessorKey: "mnemonic",
		header: "Mnemonic",
		cell: ({ row }) => {
			const value = row.getValue("mnemonic") as string;
			const available = Boolean(value);
			return (
				<div className={cn(available ? "text-green-300" : "text-destructive")}>
					{available ? "Available" : "Unavailable"}
				</div>
			);
		},
	},
	{
		accessorKey: "walletKitConnected",
		header: "Wallet Kit Connected",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("walletKitConnected"));
			return (
				<div className={cn(value ? "text-green-300" : "text-destructive")}>
					{value ? "Connected" : "Not connected"}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const value = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size={"lg"} variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							disabled={!value.mnemonic}
							onClick={() => navigator.clipboard.writeText(value.mnemonic)}
						>
							Copy Secret Phrase
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<UpdateUser user={value} />
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => admin.impersonateUser({ userId: value.id })}
						>
							Impersonate user
						</DropdownMenuItem>
						{value.banned ? (
							<DropdownMenuItem
								onClick={() => admin.unbanUser({ userId: value.id })}
							>
								Unban user
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem
								onClick={() => admin.banUser({ userId: value.id })}
							>
								Ban user
							</DropdownMenuItem>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className={cn(
								buttonVariants({ variant: "destructive" }),
								"w-full",
							)}
							onClick={() => admin.removeUser({ userId: value.id })}
						>
							Delete user
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
