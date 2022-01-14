const Bagel = require('../src/bagel')
const Item = require('../src/item')
const Basket = require('../src/basket')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('can add a bagel to the basket', () => {
    // set up
    const expected = new Item(1, 1, new Bagel('onion', 3.99))

    // execute
    const result = basket.addItem('onion', 3.99, 1)

    // verify
    expect(result).toEqual(expected)
  })
  it('can show a list of all items in the basket - empty', () => {
    // set up
    const expected = 0
    // execute
    const result = basket.getItems()
    // verify
    expect(result.length).toEqual(expected)
  })
  it('can show a list of all items in the basket - multiple', () => {
    // set up
    const expected = [
      {
        type: 'onion',
        price: 2.99
      },
      {
        type: 'bacon',
        price: 3.99
      },
      {
        type: 'salmon',
        price: 5.99
      }
    ]
    expected.forEach((item) => basket.addItem(item.type, item.price, 1))
    // execute
    const result = basket.getItems()
    // verify
    expect(result.length).toEqual(expected.length)
  })
  it('can remove an item from the basket', () => {
    // set up
    const data = [
      {
        type: 'onion',
        price: 2.99
      },
      {
        type: 'bacon',
        price: 3.99
      },
      {
        type: 'salmon',
        price: 5.99
      }
    ]
    data.forEach((item) => basket.addItem(item.type, item.price, 1))
    const expected = new Item(2, 1, new Bagel(data[1].type, data[1].price))
    // execute
    const result = basket.removeItem(2)
    // verify
    expect(result).toEqual(expected)
  })
  it('can remove an item from the basket', () => {
    // set up
    const expected = 'item not found'
    // execute
    const result = basket.removeItem(2)
    // verify
    expect(result).toEqual(expected)
  })
})
