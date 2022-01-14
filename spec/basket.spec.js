/* eslint-disable semi */
/* eslint-disable no-undef */
const Basket = require('../src/basket.js');

describe('Basket', () => {
  let basket;

  beforeEach(() => {
    basket = new Basket();
  });

  it('basket is empty', () => {
    // set up
    const expected = [];
    // execute
    const result = basket.checkBasket();
    // verify
    expect(result).toEqual(expected);
  });

  it('add an item to the basket', () => {
    // set up
    const expected = {
      type: 'onion',
      price: '£2.50',
    };

    // execute
    basket.addItem(expected);
    const result = basket.checkBasket(expected);
    // verify
    expect(result).toEqual([expected]);
  });
});
