import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
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

const BlogPostTemplate = ({ pageContext, data, location }) => {
  const post = data.markdownRemark;
  const htmlTitle = `${post.frontmatter.title} - ${config.siteTitle}`;
  const subtitle = `Published ${post.frontmatter.date}`;
  const featuredImage = post.frontmatter.featuredImage.childImageSharp.fixed.src;

  return (
    <Layout title={post.frontmatter.title} subtitle={subtitle}>
      <HeaderOverrides title={htmlTitle} url={location.href} />

      <Container>
        <PageBody body={post.html} />
      </Container>
    </Layout>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            fixed(width: 1000, toFormat: JPG) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
