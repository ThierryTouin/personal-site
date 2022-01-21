const cv = require('./data/cv-data');

module.exports = {
  siteMetadata: {
    title: "Thierry Touin",
    description: "Site personel",
    "menuLinks": [
      {
        "name": "Home",
        "link": "/"
      },
      {
        "name": "Blog",
        "link": "/blog/"
      },
      {
        "name": "Contact",
        "link": "/contact/"
      },
      {
        "name": "About",
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
      }
    ],    
    author: "TTO",
    ...cv
  },
  plugins: [
    "gatsby-plugin-react-helmet",
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
