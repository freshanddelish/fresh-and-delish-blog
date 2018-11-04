import React from 'react'
import Helmet from 'react-helmet'
import 'tachyons'
import '../styles/story.less'
import favicon from '../images/favicon.ico'
import config from '../utils/siteConfig'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, title, subtitle, featuredImage }) => {
  return (
    <div className="siteRoot">
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
        <link href="https://fonts.googleapis.com/css?family=Quattrocento+Sans:400,400i,700,700i|Quattrocento:400,700|Spectral:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet" />
        <meta name="description" content={config.siteDescription} />
        <meta property="og:title" content={config.siteTitle} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={config.siteTitle} />
      </Helmet>

      <>
        <div className="siteContent">
          {/* FIXME(gdennis): add class is-page-true on recipes / blog posts */}
          <div className="ma0 bg-white">
            <Header title={title} subtitle={subtitle} featuredImage={featuredImage}/>
            {/* <Menu /> */}
            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </>
    </div>
  )
}

export default Layout
