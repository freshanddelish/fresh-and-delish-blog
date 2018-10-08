import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import {Index} from 'elasticlunr';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title="Search"
        />
        <Bio />
        <div>
          <input type="text" value={this.state.query} onChange={this.autocomplete} onSubmit={this.search}/>
          <ul>
            {this.state.results.map(page => (
              <li key={page.title}>
                {page.title}: {page.tags !== undefined ? page.tags.join(`, `) : ""}
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
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
