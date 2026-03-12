import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess({ script: true }),
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      out: "build",
      precompress: true, // Enable compression
      envPrefix: "",
    }),
    alias: {
      $utils: "./src/lib/utils",
      "$utils/*": "./src/lib/utils/*",
      $components: "./src/lib/components",
      "$components/*": "./src/lib/components/*",
      $types: "./src/lib/api/types",
      "$types/*": "./src/lib/api/types/*",
      $api: "./src/lib/api",
      "$api/*": "./src/lib/api/*",
    },
  },
};
