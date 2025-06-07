// import { Tabbar, Avatar } from "@telegram-apps/telegram-ui";
// import { Home, Settings2 } from "lucide-react";
// import { useNavigate, useMatch } from "react-router-dom";
// import { Link } from "./Link/Link";
// import {
// 	initDataState as dataState,
// 	useSignal,
// } from "@telegram-apps/sdk-react";

// export function Navbar() {
// 	const navigate = useNavigate();
// 	const initDataState = useSignal(dataState);
// 	const user = initDataState?.user;

// 	const navLinks = [
// 		{ title: "Home", icon: <Home />, url: "/" },
// 		{
// 			title: "Profile",
// 			icon: <Avatar src={user?.photo_url} />,
// 			url: "/profile",
// 		},
// 		{ title: "Settings", icon: <Settings2 />, url: "/settings" },
// 	];

// 	return (
// 		<Tabbar>
// 			{navLinks.map((n) => (
// 				<Tabbar.Item
// 					key={n.title}
// 					text={n.title}
// 					onClick={() => navigate(n.url)}
// 					selected={!!useMatch(n.url)}
// 				>
// 					<Link to={n.url}>{n.icon}</Link>
// 				</Tabbar.Item>
// 			))}
// 		</Tabbar>
// 	);
// }
