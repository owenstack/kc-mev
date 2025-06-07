import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		BOT_TOKEN: z.string(),
	},
	clientPrefix: "VITE_",
	client: {
		VITE_PROD_API_URL: z.string().url(),
		VITE_BOT_NAME: z.string().default("kc_mev_bot"),
		VITE_FAMILY_PROJECT_ID: z.string(),
	},
	runtimeEnv: import.meta.env,
});
