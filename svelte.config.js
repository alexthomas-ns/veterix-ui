import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import {resolve} from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({postcss:true}),

	kit: {
		adapter: adapter({out:"build"}),
		vite: {
			resolve: {
				alias :{
					"@component": resolve("./src/component"),
					"@service": resolve("./src/service"),
					"@utility": resolve("./src/utility")
				}
			}
		}
	}
};

export default config;
