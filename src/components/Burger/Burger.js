import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    let transformedIngredient = Object.keys(props.ingredients)  // ["salad", "bacon", "cheese", "meat"]
        .map(igKey => {
            return [...Array(props.ingredients[igKey])] //[Array(1), Array(1), Array(2), Array(2)] -> undifined
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} />
                });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);

