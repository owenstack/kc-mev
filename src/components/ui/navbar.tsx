import { Tabbar } from "@telegram-apps/telegram-ui";
import { Avatar } from "@telegram-apps/telegram-ui";
import { Home, Settings2 } from "lucide-react";
import { user } from "@/lib/constants";
import { useNavigate, useMatch } from "react-router-dom";

const navLinks = [
	{ title: "Home", icon: <Home />, url: "/" },
	{
		title: "Profile",
		icon: <Avatar src={user?.photo_url} />,
		url: "/profile",
	},
	{ title: "Settings", icon: <Settings2 />, url: "/settings" },
];

export function Navbar() {
	const navigate = useNavigate();
	return (
		<Tabbar>
			{navLinks.map((n) => (
				<Tabbar.Item
					key={n.title}
					text={n.title}
					onClick={() => navigate(n.url)}
					selected={!!useMatch(n.url)}
				>
					{n.icon}
				</Tabbar.Item>
			))}
		</Tabbar>
	);
}
