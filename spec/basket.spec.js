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
});
