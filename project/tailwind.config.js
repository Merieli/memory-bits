/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
    },
    theme: {
        extend: {
            keyframes: {
                slideDownAndFade: {
                    from: { opacity: 0, transform: 'translateY(-2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideLeftAndFade: {
                    from: { opacity: 0, transform: 'translateX(2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                slideUpAndFade: {
                    from: { opacity: 0, transform: 'translateY(2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideRightAndFade: {
                    from: { opacity: 0, transform: 'translateX(-2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
            },
            animation: {
                slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
        colors: {
            'transparent': 'transparent',
            'white': '#FFFFFF',
            'black': '#000000',
            'meri-light': '#E0BFFF',
            'meri-mid': '#BC72FF',
            'meri-dark': '#965CCC',
            'meri-low': '#5E3980',
            'success-light': '#04D36',
            'success-base': '#1B873F',
            'success-dark': '#051B0D',
            'danger-light': '#F75A68',
            'danger-base': '#CC293',
            'danger-dark': '#2D090C',
            'warning-light': '#FBA94',
            'warning-base': '#EB8A1D',
            'warning-dark': '#2E1B06',
            'blue-light': '#9EB6F1',
            'blue-mid': '#6A92F2',
            'blue-dark': '#2660EB',
            'black-light': '#292929',
            'black-dark': '#020202'
        },
    },
    plugins: [],
}
