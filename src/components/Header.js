import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Menu from './Menu'

const Header = ({data, title, subtitle, featuredImage}) => (
    <header className="cover bg-top" style={{backgroundImage: `url(${featuredImage || data.header.childImageSharp.fixed.src})`, backgroundPosition: 'center'}}>
        <div className="bg-black-40 bb bt">
            <Menu />
            <div id="hdr" className="tc-l pv4-ns pv5-l pv2 ph3 ph4-ns">
                <h1 className="near-white mt1-ns f2 fw3 mb0 mt0 lh-title">{title}</h1>
                {subtitle &&
                    <h2 className="near-white mt3-l mb4-l fw1 f6 f3-l measure-wide-l center lh-copy mt2 mb3">{subtitle}</h2>
                }
            </div>        
        </div>
    </header>
);

const query = graphql`
  query {
    header: file(relativePath: { eq: "market-header.png" }, sourceInstanceName: { eq: "images" }) {
      childImageSharp {
        fixed(width: 1433, toFormat: JPG) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const HeaderWrapper = (props) => ( 
  <StaticQuery
    query={query}
    render={data => <Header data={data} {...props} />}
    />
);

export default HeaderWrapper