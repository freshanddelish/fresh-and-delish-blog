import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import marketHeaderImage from '../images/market-header.png'
import Menu from './Menu'
import logo from '../images/logo.png'
import config from '../utils/siteConfig'

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

const Header = () => (
    <header className="cover bg-top" style={{backgroundImage: `url(${marketHeaderImage})`, backgroundPosition: 'center'}}>
        <div className="bg-black-30 bb bt">
            <Menu />
        </div>
    </header>
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

export default Header