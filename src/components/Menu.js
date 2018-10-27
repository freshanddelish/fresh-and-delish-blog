import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import logo from '../images/logo.png'
import config from '../utils/siteConfig'

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

const Menu = () => (
    <nav className="hide-print sans-serif  border-box pa3 ph5-l">
        <Link to="/" title="Home">
            <img src={logo} className="w4" alt={config.siteTitleAlt} />
        </Link>
        <div className="fr h2 pv2 tr">
            <Link to="/tags" className="link f5 ml2 dim near-white">Tags</Link>
            <Link to="/search" className="link f5 ml2 dim near-white fas fa-search" role="search" title="Search"></Link>
        </div>
    </nav>
);

// const Menu = () => {
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

export default Menu