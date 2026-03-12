import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [deno(), sveltekit()],
    server: {
        fs: {
            allow: [".."],
        },
    },
});
