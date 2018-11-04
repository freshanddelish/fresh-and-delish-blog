const remark = require('remark')
const stripMarkdown = require('strip-markdown')

module.exports = {
  siteMetadata: {
    title: 'Fresh & Delish',
    author: 'Kim',
    description: 'Delicious and healthy gluten-free vegetarian and fish recipes',
    siteUrl: 'https://freshanddelish.github.io/',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/recipes`,
        name: 'recipes',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-smartypants',
          'gatsby-remark-external-links',
          `gatsby-remark-excerpt`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              toFormat: "JPG",
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: '@andrew-codes/gatsby-plugin-elasticlunr-search',
      options: {
        fields: [
          'title',
          'tags',
          'content',
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug,
            content: node => remark().use(stripMarkdown).processSync(node.rawMarkdownBody).contents,
          }
        }
      }
    },
    `gatsby-plugin-less`,
  ],
}
