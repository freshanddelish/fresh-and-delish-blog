import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'
import Container from '../components/Container'
import Card from '../components/Card'
import CardList from '../components/CardList'
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

const TagsPage = ({ pageContext, data, location }) => {
  const title = `Tags - ${config.siteTitle}`;
  const tags = data.allMarkdownRemark.group;
  return (
    <Layout title={title}>
      <HeaderOverrides title={title} url={location.href} />

      <Container>
        <PageBody>
          <ul>
          {tags.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </PageBody>
      </Container>
    </Layout>
  );
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
