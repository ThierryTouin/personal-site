const cv = require('./data/cv-data');

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://thierrytouin.fr',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    siteUrl: `https://thierrytouin.fr`,
    title: "tto's blog",
    description: "Blog de Thierry Touin",
    "menuLinks": [
      {
        "name": "Home",
        "link": "/"
      }/*,
      {
        "name": "Blog",
        "link": "/blog/"
      }*/,
      {
        "name": "About-Me",
        "link": "/about/",
        "subMenu": [
          {
            "name": `Experiences`,
            "link": `/about/experiences`
          },
          {
            "name": `Educations`,
            "link": `/about/educations`
          }
        ]        
      },
      {
        "name": "Contact",
        "link": "/contact/"
      }
    ],    
    author: "TTO",
    ...cv
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/contents/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },       
  ],
}
