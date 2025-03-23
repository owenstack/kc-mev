import { createAuthClient } from "better-auth/react";
import {
	anonymousClient,
	usernameClient,
	adminClient,
} from "better-auth/client/plugins";
import { baseURL } from "./constants";

const auth = createAuthClient({
	baseURL,
	plugins: [anonymousClient(), usernameClient(), adminClient()],
});

export const { useSession, signIn, signUp, signOut, resetPassword } = auth;
