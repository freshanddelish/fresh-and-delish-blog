import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components-old/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'

const TagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} recipe${ totalCount === 1 ? "" : "s"} tagged with "${tag}"`

  return (
    <Layout location={location}>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </Layout>
  );
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
