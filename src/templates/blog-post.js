import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Metadata from "../components/metadata"

import * as postStyles from "./blogPost.module.scss"


import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
deckDeckGoHighlightElement();

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        date(formatString: "DD MMMM, YYYY")
        featured {
          childImageSharp {
            fluid(maxWidth: 750) {
              ...GatsbyImageSharpFluid
            }
          }
        }        
      }
      timeToRead
      html
    }
  }
`

const BlogPost = props => {
  return (
    <Layout>
      <Metadata 
        title={props.data.markdownRemark.frontmatter.title} 
        description={props.data.markdownRemark.frontmatter.description} 
        //urlBlog={`/blog/${props.data.slug}`}
      />

      <div className={postStyles.content}>
        <h1>{props.data.markdownRemark.frontmatter.title}</h1>
        <span className={postStyles.meta}>
          Posted on {props.data.markdownRemark.frontmatter.date}{" "}
          <span> / </span> {props.data.markdownRemark.timeToRead} min read
        </span>
  
        {props.data.markdownRemark.frontmatter.featured && (
          <Img
            className={postStyles.featured}
            fluid={
              props.data.markdownRemark.frontmatter.featured.childImageSharp.fluid
            }
            alt={props.data.markdownRemark.frontmatter.title}
          />
        )}
  
        <div
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        ></div>
      </div>
    </Layout>
  )
  
}

export default BlogPost