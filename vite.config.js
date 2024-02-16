import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	define: {
		__APP_ENV__: loadEnv(mode, process.cwd()).APP_ENV,
	},
	//server: {
	//	port: 80,
	//},
	// preview: {
	//  port: 80
	// },
	// build: {
	//  outDir: 'frontend'
	// }
}))
