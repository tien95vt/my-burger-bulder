import reducer from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

describe('burgerBuilder reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ingredients: null,
      totalPrice: 4,
      error: false
    });
  });

  it('Should add ingredient successfully', () => {
    expect(reducer({
      ingredients: {salad: 0},
      totalPrice: 4,
      error: false
    }, {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: 'salad'
    })).toEqual({
      ingredients: { salad: 1 },
      totalPrice: 4.5,
      error: false
    });
  });
});
