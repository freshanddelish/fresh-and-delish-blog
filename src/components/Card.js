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

const Card = ({ url, featuredImage, title, publishDate, body, ...props }) => (
    <div className="relative w-100">
        <article className="bb b--black-10">
            <div className="db pv4 ph3 ph0-l no-underline dark-gray">
                <div className="flex flex-column flex-row-ns">
                    
                    <div className="mb4 mb0-ns w-100 h4 h4-m w4-m h5-ns w5-ns br3 cover hide-child" style={featuredImage && {
                        backgroundImage: `url(${featuredImage.childImageSharp.fluid.src})`,
                        backgroundPosition: `center`
                    }}>
                        <Link to={url} className="db child w-100 h-100 f7 lh-copy white no-underline br3 ph3 pt4 pt5-l ttu tc bg-black-60">
                        </Link>
                    </div>
                    
                    <div className="w-100 w6-ns pl3-ns">
                        <h1 className="f3 fw1 mt0 lh-title"><Link to={url} className="color-inherit dim link">{title}</Link></h1>
                        <div className="f6 f5-l lh-copy nested-copy-line-height nested-links">
                            <div dangerouslySetInnerHTML={{__html: body}}></div>
                            <p className="pa0 sans-serif f7"><Link to={url} className="ba br3 pa2 link">Continue Reading <FontAwesomeIcon icon={faChevronCircleRight}/></Link></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>);

export default Card