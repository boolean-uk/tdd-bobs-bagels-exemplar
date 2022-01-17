const Item = require('../src/item')
const Basket = require('../src/basket')
const getBagelBySku = require('./util').getBagelBySku

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('can add a bagel to the basket', () => {
    // set up
    const expected = new Item(1, 1, getBagelBySku('BGLO'))

    // execute
    const result = basket.addItem('BGLO')

    // verify
    expect(result).toEqual(expected)
  })
  it('can show a list of all items in the basket - empty', () => {
    // set up
    const expected = 0
    // execute
    const result = basket.getItemsInBasket()
    // verify
    expect(result.length).toEqual(expected)
  })
  it('can show a list of all items in the basket - multiple', () => {
    // set up
    const expected = ['BGLO', 'BGLP', 'BGLS']
    expected.forEach((item) => basket.addItem(item))
    // execute
    const result = basket.getItemsInBasket()
    // verify
    expect(result.length).toEqual(expected.length)
  })
  it('can remove an item from the basket', () => {
    // set up
    const data = ['BGLO', 'BGLP', 'BGLS']
    data.forEach((item) => basket.addItem(item))
    const expected = new Item(1, 1, getBagelBySku('BGLO'))
    // execute
    const result = basket.removeItem('BGLO')
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
  it('returns an error message when trying to add an item to an already full basket', () => {
    // set up
    const data = ['BGLO', 'BGLP', 'BGLS', 'BGSE', 'BGSS']
    data.forEach((item) => basket.addItem(item))
    // execute
    const result = basket.addItem('COF')
    // verify
    expect(result).toEqual('your basket is full')
  })
  it('can change the size of the basket', () => {
    // set up
    const data = ['BGLO', 'BGLP', 'BGLS', 'BGSE', 'BGSS']
    const expected = new Item(6, 1, getBagelBySku('COF'))
    data.forEach((item) => basket.addItem(item))
    // execute
    basket.size = 6
    const result = basket.addItem('COF')
    // verify
    expect(result).toEqual(expected)
  })
})
