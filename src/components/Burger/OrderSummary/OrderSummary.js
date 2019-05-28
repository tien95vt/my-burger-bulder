import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients) // {m: 1, s: 2} -> [m, s]
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continuous to checkout?</p>
        </Aux>
    );
};

export default orderSummary;