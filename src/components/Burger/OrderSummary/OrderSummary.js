import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // This could be a functional component, I change to debug performance use shouldComponentUpdate in Modal component
    componentWillUpdate() { // detect performance
        console.log('[Order Summary] componentWillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients) // {m: 1, s: 2} -> [m, s]
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continuous to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;