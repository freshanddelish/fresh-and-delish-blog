import React from 'react'

const PageBody = ({ body, ...props }) => (
    <article 
        className="center bg-white br-3 pv1 ph4 nested-copy-line-height lh-copy f4 nested-links mw-100 measure-wide"
        dangerouslySetInnerHTML={body ? {__html: body} : null} >
        {props.children}
    </article>);

export default PageBody;