import duckHello from "@/assets/stickers/duck_hello.json";
import sponge from "@/assets/videos/spongebob.mp4";
import duckMoney from "@/assets/stickers/duck_money.json";
import { Page } from "@/components/Page";
import { StickerDiv } from "@/components/sticker";
import {
	Section,
	Text,
	Title,
	Button,
	Checkbox,
	List,
	Steps,
	Cell,
	Caption,
	Badge,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentModal } from "@/components/payment-modal";

export function OnboardingPage() {
	const [page, setPage] = useState(0);
	const [selected, setSelected] = useState<"basic" | "premium" | "free">(
		"premium",
	);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const hello = duckHello as unknown as JSON;
	const money = duckMoney as unknown as JSON;

	const handleClick = () => {
		if (page > 1) {
			if (selected === "premium") {
				setOpen(true);
				return;
			}
			if (selected === "basic") {
				// Handle basic subscription
				return;
			}
			navigate("/home");
		}
		setPage((prev) => prev + 1);
	};

	return (
		<Page back={false}>
			<Section className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
				{page === 0 ? (
					<Section className="flex flex-col items-center justify-center gap-6 p-4">
						<StickerDiv
							json={hello}
							className="w-64 h-64 place-self-center-safe"
							loop
							speed={1}
							autoplay
							playOnClick
						/>
						<Title className="text-center font-semibold">
							Welcome to the Galaxy!
						</Title>
						<Text className="text-center">
							Your one way to earn crypto passively
						</Text>
					</Section>
				) : page === 1 ? (
					<Section className="flex flex-col items-center justify-center gap-6 p-4">
						<StickerDiv
							json={money}
							className="w-64 h-64 place-self-center-safe"
							loop
							speed={1}
							autoplay
							playOnClick
						/>
						<Title>Here are some amazing features</Title>
						<List>
							{[
								"MEV bot for DEX",
								"Scalper for CEX",
								"Arbitrage bot for DEX",
								"Liquidity bot for DEX",
								"All running in the background for you...",
							].map((feature) => (
								<div key={feature} className="flex items-center gap-2">
									<Checkbox defaultChecked />
									<Text>{feature}</Text>
								</div>
							))}
						</List>
					</Section>
				) : (
					<Section className="flex flex-col items-center justify-center gap-6 p-4">
						<video
							src={sponge}
							autoPlay
							loop
							className="w-64 h-64 place-self-center-safe"
						>
							<track
								kind="captions"
								src="captions.vtt"
								label="English captions"
							/>
						</video>
						<Title className="text-center font-semibold py-4">
							Unlock PRO features
						</Title>
						<List>
							<Cell
								Component={"label"}
								multiline
								className={`border rounded-lg relative ${selected === "premium" && "border-blue-500"}`}
								onClick={() => setSelected("premium")}
							>
								<Badge type="number" className="absolute -top-2 -right-1.5">
									Best offer
								</Badge>
								<div className="grid gap-2">
									<div className="flex items-center justify-between gap-2">
										<Text>Premium</Text>
										<Text>$20/month</Text>
									</div>
									<Caption>
										Unlocks all features and best performing aggregates
									</Caption>
								</div>
							</Cell>
							<Cell
								Component={"label"}
								multiline
								className={`border rounded-lg ${selected === "basic" && "border-blue-500"}`}
								onClick={() => setSelected("basic")}
							>
								<div className="grid gap-2">
									<div className="flex items-center justify-between gap-2">
										<Text>Basic</Text>
										<Text className="pl-43">$10/month</Text>
									</div>
									<Caption>Unlocks basic features</Caption>
								</div>
							</Cell>
							<Cell
								Component={"label"}
								multiline
								className={`border rounded-lg ${selected === "free" && "border-blue-500"}`}
								onClick={() => setSelected("free")}
							>
								<div className="grid gap-2">
									<div className="flex items-center justify-between gap-2">
										<Text>Free</Text>
										<Text className="pl-43">$0/month</Text>
									</div>
									<Caption>Start free...</Caption>
								</div>
							</Cell>
						</List>
					</Section>
				)}
				<Steps progress={page + 1} count={4} />
				<Button
					className="btn btn-lg mt-8 w-full max-w-sm bottom-4"
					onClick={handleClick}
				>
					{page === 0
						? "Welcome"
						: page === 1
							? "Next"
							: selected === "premium"
								? "Subscribe for $20/month"
								: selected === "basic"
									? "Unlock basic features"
									: "Skip to Home"}
				</Button>
			</Section>
			<PaymentModal open={open} setOpen={setOpen} />
		</Page>
	);
}
