import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {},
	clientPrefix: "VITE_",
	client: {
		VITE_DEV_API_URL: z.string().url().default("http://localhost:8787"),
		VITE_PROD_API_URL: z.string().url(),
		VITE_BOT_NAME: z.string().default("kc_mev_bot"),
		VITE_FAMILY_PROJECT_ID: z.string(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
