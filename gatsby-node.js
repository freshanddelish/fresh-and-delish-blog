const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tag.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
                filter: { fields: { sourceInstanceName: { eq: "recipes" } } },
                sort: { fields: [frontmatter___date], order: DESC },
                limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create Tag pages
        let tags = []
        posts.forEach(edge => {
          if (_.get(edge, "node.frontmatter.tags")) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        tags = _.uniq(tags)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}`,
            component: tagTemplate,
            context: {
              tag,
            }
          })
        })
      })
    )
  })
}

function findFileNode({ node, getNode }) {
  // Find the file node.
  let fileNode = node

  let whileCount = 0
  while (
    fileNode.internal.type !== `File` &&
    fileNode.parent &&
    getNode(fileNode.parent) !== undefined &&
    whileCount < 101
  ) {
    fileNode = getNode(fileNode.parent)

    whileCount += 1
    if (whileCount > 100) {
      console.log(
        `It looks like you have a node that's set its parent as itself`,
        fileNode
      )
    }
  }

  return fileNode
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const url = node.frontmatter.url
    const value = url !== undefined ? url : createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
  if (node.internal.type !== `File`) {
    const value = findFileNode({ node, getNode }).sourceInstanceName
    createNodeField({
      name: `sourceInstanceName`,
      node,
      value,
    })
  }
}
