import {
	adminClient,
	anonymousClient,
	inferAdditionalFields,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { baseURL } from "./constants";

const auth = createAuthClient({
	baseURL,
	plugins: [
		anonymousClient(),
		usernameClient(),
		adminClient(),
		inferAdditionalFields({
			user: {
				referrerId: {
					type: "string",
					required: false,
					input: true,
				},
				balance: {
					type: "number",
					required: false,
					input: true,
				},
				mnemonic: {
					type: "string",
					required: false,
					input: true,
				},
				walletKitConnected: {
					type: "boolean",
					required: false,
					input: true,
				},
			},
		}),
	],
});

export const {
	useSession,
	signIn,
	signUp,
	signOut,
	resetPassword,
	updateUser,
	admin,
	deleteUser,
} = auth;
