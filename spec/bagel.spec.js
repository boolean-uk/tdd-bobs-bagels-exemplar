const Bagel = require('../src/bagel')

describe('Bagel', () => {
  it('stores the id, type, and price of a bagel', () => {
    // set up
    const expected = {
      type: 'onion',
      price: 2.99
    }
    // execute
    const result = new Bagel(expected.type, expected.price)
    // verify
    expect(result.type).toEqual(expected.type)
    expect(result.price).toEqual(expected.price)
  })
})
