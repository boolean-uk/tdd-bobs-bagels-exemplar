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
      id: 1,
      type: 'onion',
      price: '£2.50'
    };

    // execute
    const result = basket.addItem(expected);
    // verify
    expect(result).toEqual([expected]);
  });

  it('remove an item from the basket', () => {
    // set up
    const expected = {
      id: 1,
      type: 'onion',
      price: '£2.50'
    };

    // execute
    basket.addItem(expected);
    const result = basket.removeItem(expected.id);
    // verify
    expect(result.length).toEqual(0);
  });

  it('be told that the basket is full', () => {
    // set up#
    const expected = [
      {
        id: 1,
        type: 'onion',
        price: '£2.50'
      },
      {
        id: 2,
        type: 'onion',
        price: '£2.50'
      },
      {
        id: 3,
        type: 'onion',
        price: '£2.50'
      },
      {
        id: 4,
        type: 'onion',
        price: '£2.50'
      },
      {
        id: 5,
        type: 'onion',
        price: '£2.50'
      }
    ];
    const exp = {
      id: 6,
      type: 'onion',
      price: '£2.50'
    };

    expected.forEach((element) => basket.addItem(element));
    // execute
    const result = basket.addItem(exp);
    // verify
    expect(result).toEqual('your basket is full');
  });
});
