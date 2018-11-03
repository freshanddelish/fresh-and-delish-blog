const flatMap = require('unist-util-flatmap')
const toHAST = require(`mdast-util-to-hast`)
const hastToHTML = require(`hast-util-to-html`)

let pluginCache;

const setPluginCache = cache => { pluginCache = cache };

const isMore = node => {
    if (node.type === `comment` && node.value === `more`) {
        return true;
    } else if (node.type === `raw` && node.value === `<!--more-->`) {
        return true;
    } else {
        return false;
    }
}

const excerptCacheKey = (node) => {
    return `gatsby-remark-excerpt-${node.internal.contentDigest}`;
}

module.exports = async ({markdownAST, markdownNode}) => {
    const cacheKey = excerptCacheKey(markdownNode);
    const cachedExcerpt = await pluginCache.get(cacheKey);
    if (cachedExcerpt) {
        return cachedExcerpt;
    }

    let foundExcerptTerminator = false;
    const htmlAst = toHAST(markdownAST, {allowDangerousHTML: true})
    flatMap(htmlAst, node => {
        if (foundExcerptTerminator === true) {
            return []
        } else if (node.type === `element` && node.tagName === `img`) {
            return []
        } else if (isMore(node)) {
            foundExcerptTerminator = true;
            return []
        } else {
            return [node]
        }
    })
    const excerptHtml = hastToHTML(htmlAst)

    pluginCache.set(cacheKey, excerptHtml);

    return markdownAST;
}

module.exports.setPluginCache = setPluginCache;
