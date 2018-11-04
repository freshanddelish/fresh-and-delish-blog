import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
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

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  const htmlTitle = `${post.frontmatter.title} - ${config.siteTitle}`;
  const subtitle = `Published ${post.frontmatter.date}`;

  return (
    <Layout title={post.frontmatter.title} subtitle={subtitle}>
      <HeaderOverrides title={htmlTitle} url={location.href} />

      <Container>
        <PageBody body={post.html} />
        <TagList tags={post.frontmatter.tags} />
      </Container>
    </Layout>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
