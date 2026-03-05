export default defineNuxtConfig({
    ssr: true,

    nitro: {
        preset: 'static',
    },

    runtimeConfig: {
        public: {
            wpUrl: process.env.WP_URL,
        },
    },

    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: '/css/global.css' },
                { rel: 'stylesheet', href: '/css/swiper-bundle.min.css' },
            ],
            script: [
                { src: '/js/swiper-bundle.min.js', defer: true },
                { src: '/js/script.js', defer: true },
            ],
        },
    },

    devtools: { enabled: false },

    compatibilityDate: '2025-11-14',
})
