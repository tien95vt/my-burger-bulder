import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purChaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purChaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purChaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purChaseBurgerFail(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}