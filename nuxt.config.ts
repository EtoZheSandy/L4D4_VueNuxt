// https://nuxt.com/docs/api/configuration/nuxt-config

// defineNuxtConfig
export default({
    buildModules: [
        '@nuxtjs/tailwindcss',
        'nuxt-bootstrap-icons',
        'nuxt-security',
        // '@kevinmarrec/nuxt-pwa'
    ],
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-bootstrap-icons',
        'nuxt-security',
        // '@kevinmarrec/nuxt-pwa'
    ],

    runtimeConfig: {
        public: {
            apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
        }
    },

    // bootstrapIcons: {
    //     display: "inline", // or 'component'
    // },

    ssr: false, // раньше работало при true теперь жалуется на setInterval

    // Target: https://go.nuxtjs.dev/config-target
   target: "server",

   nitro: {
       prerender: {
           routes: ['/heroes', '/rules', '/servers', '/team', '/top', '/']
       },
       routes: {
           '/': { cors: true },
           '/*': { prerender: true }
       }
   },

    devtools: { enabled: true },

    tailwindcss: {
        cssPath: '~/assets/css/main.css'
    },
    css: ['~/assets/l4d4.css'],
    app: {
        head: {
            charset: 'utf-8',
            htmlAttrs: {
                lang: 'ru',
            },
        }
    },
    // security: {
    //     headers: {
    //         contentSecurityPolicy: false,
    //         crossOriginOpenerPolicy: false,
    //         crossOriginEmbedderPolicy: false,
    //         },
    //     hidePoweredBy: true,
    // },
})

