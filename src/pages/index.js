import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image';

import Layout from '../components/Layout'
import Container from '../components/Container'
import Card from '../components/Card'
import CardList from '../components/CardList'
import config from '../utils/siteConfig'

const BlogIndex = ({ pageContext, data, location }) => {
  const { edges, totalCount } = data.allMarkdownRemark
  const title = (
    <Image 
      fluid={data.logo.childImageSharp.fluid}
      className="br4 center"
      style={{maxWidth: "380px"}}
      alt={"Fresh & Delish"}
      />
  )

  return (
    <Layout title={title} subtitle={config.siteDescription}>
      
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

export default BlogIndex

export const pageQuery = graphql`
  query {
    logo: file(relativePath: { eq: "logo.png" }, sourceInstanceName: { eq: "images" }) {
      childImageSharp {
        fluid(maxWidth: 380) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
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
          excerpt: excerptHtml
        }
      }
    }
  }
`
