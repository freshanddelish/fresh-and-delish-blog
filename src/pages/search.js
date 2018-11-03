import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
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

    return (
      <Layout title="Search">
        <HeaderOverrides title={title} url={location.href} />

        <Container>
          <PageBody>
            <input id="search" type="text" placeholder="Search..." class="pa2 br3 ba bw1 b--gray lh-title f3 sans-serif w-100" value={this.state.query} onChange={this.autocomplete} onSubmit={this.search} />
            <p>Type a search above to see results below:</p>
          </PageBody>

          <CardList>
            {this.state.results.map(page => {
              const { slug, title } = page;
              return (<Card key={slug} url={slug} title={title} />);
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
        expand: autocomplete
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
    siteSearchIndex {
        index
    }
  }
`
