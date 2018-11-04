import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

const TagList = ({tags}) => (
    <div className="ph3 center measure-wide">
        <h1 className="f6 fw6 ttu tracked">Tags</h1>
        {tags.map(tag => 
            <Link key={tag} to={`/tags/${kebabCase(tag)}`} className="f6 link dim br-pill ph3 pv2 mb2 mh1 dib white bg-black">
                {tag}
            </Link>)} 
    </div>
);

export default TagList
