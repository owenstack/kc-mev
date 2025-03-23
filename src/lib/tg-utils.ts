import WebApp from "@twa-dev/sdk";

export const userId = WebApp.initData.split("=")[1];

export const { ready, openTelegramLink, showPopup } = WebApp;
