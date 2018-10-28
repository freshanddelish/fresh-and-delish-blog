import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import marketHeaderImage from '../images/market-header.png'
import Menu from './Menu'
import logo from '../images/logo.png'
import config from '../utils/siteConfig'
import Img from "gatsby-image"

const Nav = styled.nav`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 1.5em;

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    display: inline-block;
    margin-left: 1em;
    &:first-child {
      position: relative;
      margin: 0;
      flex-basis: 100%;
    }
  }

  a {
    text-decoration: none;
    color: DarkGray;
    font-weight: 600;
    transition: all 0.2s;
    border-bottom: 2px solid ${props => props.theme.colors.base};
    &:hover {
      color: white;
    }
  }
`

const activeLinkStyle = {
  color: 'white',
}

const Header = ({data, title, subtitle}) => (
    <header className="cover bg-top" style={{backgroundImage: `url(${data.header.childImageSharp.fixed.src})`, backgroundPosition: 'center'}}>
        <div className="bg-black-30 bb bt">
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

//   return (

//     <Header>
//       <Nav>
//         <ul>
//           <li>
//             <Link to="/" activeStyle={activeLinkStyle}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/about/" activeStyle={activeLinkStyle}>
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact/" activeStyle={activeLinkStyle}>
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </Nav>
//     </Header>
//   )
// }

export default HeaderWrapper