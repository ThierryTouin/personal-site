import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Metadata = ({ title, description }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )
  const metaTitle = title || data.site.siteMetadata.title
  const metaDescription = description || data.site.siteMetadata.description
  //const canonicalUrl = data.site.siteMetadata.siteUrl || urlBlog
  //const canonicalUrl = data.site.siteMetadata.siteURL + location.pathname
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imgUrl = data.site.siteMetadata.siteUrl + "/header-image2.avif";
  return (
    <Helmet>
      <html lang="fr" />
      <title>{`${metaTitle} | ${data.site.siteMetadata.title}`}</title>

      <meta name="description" content={metaDescription} />

      
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title}></meta>
      <meta property="og:url" content={canonicalUrl}></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:description" content={description}></meta>

      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:width" content="50" />

      <meta name="twitter:card" content={metaDescription} />
      <meta property="twitter:domain" content="thierrytouin.fr" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imgUrl} />



    </Helmet>
  )
}

export default Metadata
