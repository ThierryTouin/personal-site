import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import * as promiseStyles from "./promise.module.scss"

/**
 * Promise Section Component (D06 Design)
 * Displays 3 visual proofs: professional identity, featured article, key competency
 * Mobile-first responsive layout
 */
const Promise = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          limit: 1
        ) {
          edges {
            node {
              frontmatter {
                title
                date(formatString: "DD MMM YYYY")
              }
              excerpt(pruneLength: 120)
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  const featuredPost = data.allMarkdownRemark.edges[0]?.node

  return (
    <section className={promiseStyles.promise}>
      <div className={promiseStyles.container}>
        
        {/* Proof 1: Professional Identity */}
        <article className={promiseStyles.proof}>
          <div className={promiseStyles.proofHeader}>
            <h3 className={promiseStyles.proofTitle}>
              Full-Stack Developer & Architect
            </h3>
          </div>
          <p className={promiseStyles.proofDescription}>
            15+ years building scalable systems with modern web technologies.
            Passionate about clean code, mentorship, and DevOps automation.
          </p>
          <div className={promiseStyles.proofTags}>
            <span className={promiseStyles.tag}>React</span>
            <span className={promiseStyles.tag}>Node.js</span>
            <span className={promiseStyles.tag}>Architecture</span>
          </div>
        </article>

        {/* Proof 2: Featured Content */}
        {featuredPost && (
          <article className={promiseStyles.proof}>
            <div className={promiseStyles.proofHeader}>
              <h3 className={promiseStyles.proofTitle}>Latest Article</h3>
              <span className={promiseStyles.proofDate}>{featuredPost.frontmatter.date}</span>
            </div>
            <h4 className={promiseStyles.contentTitle}>
              <Link to={`/blog/${featuredPost.fields.slug}/`}>
                {featuredPost.frontmatter.title}
              </Link>
            </h4>
            <p className={promiseStyles.proofDescription}>
              {featuredPost.excerpt}
            </p>
            <div className={promiseStyles.readMore}>
              <Link to={`/blog/${featuredPost.fields.slug}/`}>
                Read Article →
              </Link>
            </div>
          </article>
        )}

        {/* Proof 3: Key Competency */}
        <article className={promiseStyles.proof}>
          <div className={promiseStyles.proofHeader}>
            <h3 className={promiseStyles.proofTitle}>Specialized Expertise</h3>
          </div>
          <p className={promiseStyles.proofDescription}>
            Cloud architecture & DevOps practices. Docker, Kubernetes, CI/CD pipelines.
            Performance optimization & monitoring systems.
          </p>
          <div className={promiseStyles.proofTags}>
            <span className={promiseStyles.tag}>DevOps</span>
            <span className={promiseStyles.tag}>Cloud</span>
            <span className={promiseStyles.tag}>Performance</span>
          </div>
        </article>

      </div>

      {/* Call-to-Action */}
      <div className={promiseStyles.cta}>
        <Link to="/about" className={promiseStyles.ctaButton}>
          Explore Full CV
        </Link>
      </div>
    </section>
  )
}

export default Promise
