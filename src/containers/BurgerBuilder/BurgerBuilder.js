import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log('[burgerBuilder] props: ', this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients) // [salad, meat ...]
            .map(igKey => ingredients[igKey]) //[1, 2, ...]
            .reduce((total, num) => total + num, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurChase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let igKey in disabledInfo) { // key: meat...
            disabledInfo[igKey] = disabledInfo[igKey] <= 0;
        } // { salad:true, meat: false }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredient can't be loaded</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngerdientRemoved}
                        price={this.props.price}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                                price={this.props.price}
                                ingredients={this.props.ings}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
            
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngerdientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)), 
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurChase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));