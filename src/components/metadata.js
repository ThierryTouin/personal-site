import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Metadata = ({ title, description, urlBlog }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )
  const metaTitle = title || data.site.siteMetadata.title
  const metaDescription = description || data.site.siteMetadata.description
  const url = data.site.siteMetadata.siteUrl || urlBlog
  return (
    <Helmet>
      <html lang="fr" />
      <title>{`${metaTitle} | ${data.site.siteMetadata.title}`}</title>
      <meta name="description" content={metaDescription} />

      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title}></meta>
      <meta property="og:url" content={url}></meta>
      <meta property="og:description" content={description}></meta>

    </Helmet>
  )
}

export default Metadata
