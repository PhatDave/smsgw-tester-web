import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
	                            base: "./",
	                            plugins: [vue()],
	                            resolve: {
		                            alias: {
			                            '@': fileURLToPath(new URL('./src', import.meta.url)),
			                            vue: 'vue/dist/vue.esm-bundler.js',
		                            },
	                            },
	                            build: {
		                            minify: false,
		                            brotli: true
	                            }
                            })
