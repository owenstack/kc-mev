import { http, createWalletClient } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";
import "viem/window";

export const mnemonicClient = (mnemonic: string) => {
	return createWalletClient({
		account: mnemonicToAccount(mnemonic),
		chain: mainnet,
		transport: http(),
	});
};
