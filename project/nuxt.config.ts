export default defineNuxtConfig({
    devtools: { enabled: true },
    alias: {
        '@': '/<srcDir>',
        '~~': '/<rootDir>',
        'css': '/<srcDir>/assets/css',
    },
    app: {
        // baseURL: process.env.BASE_URL || "http://localhost:3000",
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxt/eslint', 
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        'radix-vue/nuxt',
        'nuxt-zod-i18n',
        '@nuxtjs/i18n'
    ],
    eslint: {
    },
    typescript: {
        typeCheck: true
    },
    pinia: {
        storesDirs: ['./store/**'],
    },
})
