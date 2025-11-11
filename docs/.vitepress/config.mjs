import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sass Edd Template',
  description: 'Plantilla moderna de Next.js con autenticación, internacionalización y componentes UI',
  
  base: '/',
  
  // Ignore dead links during build (localhost URLs and incomplete documentation pages)
  ignoreDeadLinks: true,
  
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/getting-started' },
      { text: 'Componentes', link: '/components/overview' },
      { text: 'Patrones', link: '/patterns/overview' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: {
      "/guide/": [
            {
                  text: 'Getting Started',
                  items: [
                        {
                              text: 'Getting Started',
                              link: '/guide/getting-started'
                        },
                        {
                              text: 'Authentication',
                              link: '/guide/authentication'
                        },
                        {
                              text: 'Auto Sidebar',
                              link: '/guide/auto-sidebar'
                        },
                        {
                              text: 'I18n',
                              link: '/guide/i18n'
                        },
                        {
                              text: 'Theming',
                              link: '/guide/theming'
                        }
                  ]
            },
            {
                  text: 'Strapi Integration',
                  items: [
                        {
                              text: 'Strapi Examples',
                              link: '/guide/strapi/strapi-examples'
                        },
                        {
                              text: 'Strapi Integration',
                              link: '/guide/strapi/strapi-integration'
                        },
                        {
                              text: 'Strapi Setup',
                              link: '/guide/strapi/strapi-setup'
                        },
                        {
                              text: 'Strapi Start Up',
                              link: '/guide/strapi/strapi-start-up'
                        }
                  ]
            }
      ],
      "/components/": [
            {
                  text: 'UI Components',
                  items: [
                        {
                              text: 'Overview',
                              link: '/components/overview'
                        },
                        {
                              text: 'Button',
                              link: '/components/button'
                        },
                        {
                              text: 'Card',
                              link: '/components/card'
                        },
                        {
                              text: 'Form',
                              link: '/components/form'
                        },
                        {
                              text: 'Input',
                              link: '/components/input'
                        },
                        {
                              text: 'Modal',
                              link: '/components/modal'
                        }
                  ]
            },
            {
                  text: 'Layout',
                  items: [
                        {
                              text: 'Footer',
                              link: '/components/footer'
                        },
                        {
                              text: 'Header',
                              link: '/components/header'
                        },
                        {
                              text: 'Navigation',
                              link: '/components/navigation'
                        },
                        {
                              text: 'Sidebar',
                              link: '/components/sidebar'
                        }
                  ]
            }
      ],
      "/patterns/": [
            {
                  text: 'Design Patterns',
                  items: [
                        {
                              text: 'Overview',
                              link: '/patterns/overview'
                        },
                        {
                              text: 'Design Patterns',
                              link: '/patterns/design-patterns'
                        },
                        {
                              text: 'Javascript',
                              link: '/patterns/javascript'
                        },
                        {
                              text: 'React',
                              link: '/patterns/react'
                        }
                  ]
            }
      ],
      "/api/": []
},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/sass-edd-template' }
    ],

    footer: {
      message: 'Liberado bajo la Licencia MIT.',
      copyright: 'Copyright © 2024 Sass Edd Template'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/your-username/sass-edd-template/edit/main/docs/:path',
      text: 'Editar esta página en GitHub'
    },

    lastUpdated: {
      text: 'Actualizado el',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  sitemap: {
    hostname: 'https://your-domain.com'
  }
})