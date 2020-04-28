const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(
        `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
    )

    if (result.errors) {
        throw result.errors
    }

    const releases = result.data.allMarkdownRemark.edges

    releases.forEach((release, index) => {
        const previous = index === releases.length - 1 ? null : releases[index + 1].node
        const next = index === 0 ? null : releases[index - 1].node


    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}