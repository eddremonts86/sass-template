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
      '/guide/': [
        {
          text: 'Guía de Inicio',
          items: [
            { text: 'Comenzar', link: '/guide/getting-started' },
            { text: 'Configuración', link: '/guide/configuration' },
            { text: 'Deployment', link: '/guide/deployment' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Componentes UI',
          items: [
            { text: 'Visión General', link: '/components/overview' },
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Form', link: '/components/form' },
            { text: 'DataTable', link: '/components/data-table' }
          ]
        }
      ],
      '/patterns/': [
        {
          text: 'Patrones de Diseño',
          items: [
            { text: 'Visión General', link: '/patterns/overview' },
            { text: 'React Patterns', link: '/patterns/react' },
            { text: 'JavaScript Patterns', link: '/patterns/javascript' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Documentación API',
          items: [
            { text: 'Visión General', link: '/api/' },
            { text: 'Componentes', link: '/api/components' },
            { text: 'Hooks', link: '/api/hooks' },
            { text: 'Utilidades', link: '/api/utils' }
          ]
        }
      ]
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