import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.section`
  margin: 0 auto auto;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 3em 1.5em 2em;
  flex-grow: 1;
`

const PageBody = ({ body, ...props }) => (
    <article 
        className="center bg-white br-3 pv1 ph4 nested-copy-line-height lh-copy f4 nested-links mw-100 measure-wide"
        dangerouslySetInnerHTML={{__html: body}} />);

export default PageBody;