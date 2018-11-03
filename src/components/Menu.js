import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import config from '../utils/siteConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Menu = ({ logo }) => (
    <nav className="hide-print sans-serif  border-box pa3 ph5-l">
        <Link to="/" title="Home">
            <img src={logo.childImageSharp.fixed.src} className="w4 br2" alt={config.siteTitleAlt} />
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
