import WebApp from "@twa-dev/sdk";

export const tgData = WebApp.initDataUnsafe;

export const { ready, openTelegramLink, showPopup } = WebApp;
export const withdrawBalance = (
	balance: number,
	plan: "free" | "premium" | "basic",
) => {
	if (!balance) return false;

	const thresholds = {
		free: 1000,
		basic: 500,
		premium: 350,
	};

	return balance >= thresholds[plan];
};
