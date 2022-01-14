const Bagel = require('../src/bagel')
const Item = require('../src/item')

describe('Item', () => {
  it('stores the ID, quantity, and item', () => {
    // set up
    const expected = {
      id: 1,
      quantity: 2,
      item: new Bagel('onion', 2.99)
    }
    // execute
    const result = new Item(expected.id, expected.quantity, expected.item)
    // verify
    expect(result.id).toEqual(expected.id)
    expect(result.quantity).toEqual(expected.quantity)
    expect(result.item).toEqual(expected.item)
  })
})
