const cv = require('./data/cv-data');

module.exports = {
  siteMetadata: {
    title: "Thierry Touin",
    description: "Site personel",
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
    //"gatsby-plugin-sitemap",
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
  ],
}
