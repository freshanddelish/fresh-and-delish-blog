const { GraphQLString } = require(`gatsby/graphql`)
const { setPluginCache } = require(`.`);

const excerptCacheKey = (node) => {
  return `gatsby-remark-excerpt-${node.internal.contentDigest}`;
}

module.exports.setFieldsOnGraphQLNodeType = ({ type, cache }) => {
  if (type.name === `MarkdownRemark`) {
    return {
      excerptHtml: {
        type: GraphQLString,
        resolve: async source => {
          const key = excerptCacheKey(source);
          const value = await cache.get(key);
          return value;
        }
      }
    }
  }

  // by default return empty object
  return {}
}

module.exports.onPreBootstrap = ({cache}) => {
  setPluginCache(cache);
}
