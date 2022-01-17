const Item = require('../src/item')
const Bagel = require('../src/bagel')
const getBagelBySku = require('./util').getBagelBySku

describe('Item', () => {
  it('stores the ID, quantity, and item', () => {
    // set up
    const expected = {
      id: 1,
      quantity: 2,
      item: new Bagel(...Object.values(getBagelBySku('BGLO')))
    }
    // execute
    const result = new Item(expected.id, expected.quantity, expected.item)
    // verify
    expect(result.id).toEqual(expected.id)
    expect(result.quantity).toEqual(expected.quantity)
    expect(result.item).toEqual(expected.item)
  })
})
