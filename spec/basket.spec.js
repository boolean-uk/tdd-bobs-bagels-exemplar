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
      price: 2.5
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
      price: 2.5
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
        type: 'wheat',
        price: 2.5,
        quantity: 1
      },
      {
        id: 2,
        type: 'chocalte',
        price: 2.5,
        quantity: 1
      },
      {
        id: 3,
        type: 'seasame',
        price: 2.5,
        quantity: 1
      },
      {
        id: 4,
        type: 'raisin',
        price: 2.5,
        quantity: 1
      },
      {
        id: 5,
        type: 'pepper',
        price: 2.5,
        quantity: 1
      }
    ];
    const exp = {
      id: 6,
      type: 'strawberry',
      price: 2.5,
      quantity: 1
    };

    expected.forEach((element) => basket.addItem(element));
    // execute
    const result = basket.addItem(exp);
    // verify
    expect(result).toEqual('your basket is full');
  });

  it('remove an item from the basket', () => {
    // set up
    // execute
    const result = basket.increaseBasket(5);
    // verify
    expect(result).toEqual(5);
  });

  it('be told that an item doesnt exist when trying to remove', () => {
    // set up
    const exp = {
      id: 6,
      type: 'onion',
      price: 2.5,
      quantity: 1
    };
    // execute
    basket.addItem(exp);
    const result = basket.removeItem(2);
    // verify
    expect(result).toEqual('this item does not exist');
  });

  it('increment the basket for same bagels', () => {
    // set up
    const exp = {
      id: 1,
      type: 'onion',
      price: 2.5,
      quantity: 1
    };
    // execute
    basket.addItem(exp);
    const result = basket.addItem(exp);
    // verify
    expect(result).toEqual([
      {
        id: 1,
        type: 'onion',
        price: 2.5,
        quantity: 2
      }
    ]);
  });

  it('check the bagel price before adding to basket', () => {
    // set up
    const exp = 'onion';
    // execute
    const result = basket.checkPrice(exp);
    // verify
    expect(result).toEqual(2.5);
  });

  it('calculate the total price of all the bagels', () => {
    // set up
    const expected = [
      {
        id: 1,
        type: 'wheat',
        price: 2.5,
        quantity: 1
      },
      {
        id: 2,
        type: 'chocalte',
        price: 2.45,
        quantity: 1
      },
      {
        id: 1,
        type: 'wheat',
        price: 2.5,
        quantity: 1
      }
    ];

    expected.forEach((element) => basket.addItem(element));
    // execute
    const result = basket.checkout();
    // verify
    expect(result).toEqual(7.45);
  });
});
