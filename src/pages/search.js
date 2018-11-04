import React from 'react'
import {graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Container from '../components/Container'
import Card from '../components/Card'
import CardList from '../components/CardList'
import config from '../utils/siteConfig'
import {Index} from 'elasticlunr';
import PageBody from '../components/PageBody';

const HeaderOverrides = ({title, url}) => (
  <Helmet>
    <title>{title}</title>
    <meta
      property="og:title"
      content={title}
    />
    <meta property="og:url" content={url} />
  </Helmet>);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    const title = `Search - ${config.siteTitle}`;
    const { location } = this.props;
    const edges = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout title="Search">
        <HeaderOverrides title={title} url={location.href} />

        <Container>
          <PageBody>
            <input id="search" type="text" placeholder="Search..." className="pa2 br3 ba bw1 b--gray lh-title f3 sans-serif w-100" value={this.state.query} onChange={this.autocomplete} onSubmit={this.search} />
          </PageBody>

          <CardList>
            {this.state.results.map(page => {
              const { slug } = page;
              const { node } = edges.find(edge => edge.node.fields.slug === slug);
              const { title, featuredImage } = node.frontmatter;
              const { excerpt } = node;
              return (<Card key={slug} url={slug} title={title} body={excerpt} featuredImage={featuredImage} />);
            })}
          </CardList>
        </Container>
      </Layout>
    );
  }

  getOrCreateIndex = () => this.index
    ? this.index
    : Index.load(this.props.data.siteSearchIndex.index);
  
  autocomplete = (event) => this.search(event, true)

  search = (event, autocomplete = false) => {
    const query = event.target.value;
    this.index = this.getOrCreateIndex();
    this.setState({
      query,
      results: this.index.search(query, {
        expand: autocomplete,
        fields: {
          title: { boost: 3 },
          tags: { boost: 3 },
          content: { boost: 1},
        }
      })
        .map(({
          ref,
        }) => this.index.documentStore.getDoc(ref)),
    })
  }
}

export default Search

export const query = graphql`
  query {
    allMarkdownRemark {
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
    siteSearchIndex {
      index
    }
  }
`
