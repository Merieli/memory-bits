// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": "/<srcDir>",
    "~~": "/<rootDir>",
    css: "/<srcDir>/assets/css",
  },
  app: {
    // baseURL: process.env.BASE_URL || "http://localhost:3000",
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  eslint: {
    /* module options */
  },
});
