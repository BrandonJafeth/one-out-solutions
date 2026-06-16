// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://solutions.oneoutcr.net",
  output: "static",
  adapter: cloudflare(),
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});