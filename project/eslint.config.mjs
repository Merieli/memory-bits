import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'vue/no-multiple-template-root': 'off',
    },
})
