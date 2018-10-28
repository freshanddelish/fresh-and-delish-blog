import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"
import styled from 'styled-components'
import config from '../utils/siteConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = styled.header`
  background: ${props => props.theme.colors.base};
  width: 100%;
  padding: 1.5em 0;
`
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

const Menu = ({ logo }) => (
    <nav className="hide-print sans-serif  border-box pa3 ph5-l">
        <Link to="/" title="Home">
            <Img fixed={logo.childImageSharp.fixed} className="w4 br2" alt={config.siteTitleAlt} />
        </Link>
        <div className="fr h2 pv2 tr">
            <Link to="/tags/" className="link f5 ml3 dim near-white">Tags</Link>
            <Link to="/search/" className="link f5 ml3 dim near-white" role="search" title="Search">
                <FontAwesomeIcon icon={faSearch}/>
            </Link>
        </div>
    </nav>
);

const query = graphql`
  query {
    logo: file(relativePath: { eq: "logo.png" }, sourceInstanceName: { eq: "images" }) {
      childImageSharp {
        fixed(width: 160) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const MenuWrapper = () => ( <StaticQuery query={query} render={Menu} /> );

export default MenuWrapper;
