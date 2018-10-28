import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  margin: 0 auto auto;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 3em 1.5em 2em;
  flex-grow: 1;
`

const CardList = props => (
    <div className="pa3 pa4-ns w-100 w-70-ns center">
        <section className="w-100 mw8">
            {props.children}
        </section>
    </div>
);

export default CardList