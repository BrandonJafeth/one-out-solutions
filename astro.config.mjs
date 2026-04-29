// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://oneoutsolutions.com",
  adapter: vercel(),
  output: "hybrid",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});