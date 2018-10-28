import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/Layout'
import Container from '../components/Container'
import Card from '../components/Card'
import CardList from '../components/CardList'
import config from '../utils/siteConfig'


const HeaderOverrides = ({title, url}) => (
  <Helmet>
    <title>{title}</title>
    <meta
      property="og:title"
      content={title}
    />
    <meta property="og:url" content={url} />
  </Helmet>);

const TagTemplate = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark
  const title = `Tag: ${tag} - ${config.siteTitle}`;
  const tagHeader = `${totalCount} recipe${ totalCount === 1 ? "" : "s"} tagged with "${tag}"`

  return (
    <Layout title={`Tagged with: ${tag}`}>
      <HeaderOverrides title={title} url={location.href} />
      
      <Container>
        <CardList>
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title, featuredImage } = node.frontmatter;
            const { excerpt } = node;
            return (
              <Card key={slug} url={slug} title={title} body={excerpt} featuredImage={featuredImage} />
            )
          })}
        </CardList>
      </Container>
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
            featuredImage {
              childImageSharp {
                fluid(toFormat: JPG) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`
