import React from 'react'

const CardList = props => (
    <div className="pa3 pa4-ns w-100 w-70-ns center">
        <section className="w-100 mw8">
            {props.children}
        </section>
    </div>
);

export default CardList