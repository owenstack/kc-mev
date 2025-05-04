import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern",
			},
		},
	},
	plugins: [
		// Allows using React dev server along with building a React application with Vite.
		// https://npmjs.com/package/@vitejs/plugin-react-swc
		react(),
		// Allows using the compilerOptions.paths property in tsconfig.json.
		// https://www.npmjs.com/package/vite-tsconfig-paths
		tsconfigPaths(),
		tailwindcss(),
	],
	build: {
		target: "esnext",
	},
	publicDir: "./public",
	server: {
		allowedHosts: [".ngrok-free.app"],
	},
});
