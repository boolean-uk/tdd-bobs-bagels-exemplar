const Bagel = require('../src/bagel')
const getBagelBySku = require('./util').getBagelBySku

describe('Bagel', () => {
  it('stores the id, type, and price of a bagel', () => {
    // set up
    const expected = getBagelBySku('BGSE')
    // execute
    const result = new Bagel(
      expected.sku,
      expected.price,
      expected.name,
      expected.variant,
      expected.fillings
    )
    // verify
    expect(result.sku).toEqual(expected.sku)
    expect(result.price).toEqual(expected.price)
    expect(result.name).toEqual(expected.name)
    expect(result.variant).toEqual(expected.variant)
    expect(result.fillings).toEqual(expected.fillings)
  })
})
