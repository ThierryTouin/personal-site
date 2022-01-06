const path = require("path")

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const { createNodeField } = actions  
    //console.log(JSON.stringify(node, null, 4))  
    const slug = path.basename(node.fileAbsolutePath, ".md")
    //console.log(slug)
    createNodeField({
        node,
        name: "slug",
        value: slug,
      })    
  }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const response = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
    response.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        path: `/blog/${edge.node.fields.slug}`,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
  }
  