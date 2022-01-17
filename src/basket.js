const Bagel = require('./bagel')
const Item = require('./item')
const Inventory = require('../inventory.json').inventory

class Basket {
  constructor() {
    this.items = []
    this.nextID = 1
    this.size = 5
  }

  addItem(sku) {
    const inBasket = this.items
      .map((bItem, index) => [bItem, index])
      .filter(([bItem]) => bItem.item.sku === sku)
    if (inBasket.length > 0) {
      const [bItem, index] = inBasket[0]
      bItem.quantity++
      this.items[index] = bItem
      return bItem
    }
    if (this.items.length === this.size) {
      return 'your basket is full'
    }
    const bagel = Inventory.filter((item) => item.sku === sku)
    const item = new Item(this.nextID, 1, bagel[0])
    this.items.push(item)
    this.nextID++
    return item
  }

  getItemsInBasket() {
    return this.items
  }

  removeItem(sku) {
    const filtered = this.items.filter((item) => item.item.sku === sku)
    if (filtered.length === 0) {
      return 'item not found'
    }
    this.items = this.items.filter((item) => item.item.sku !== sku)
    return filtered[0]
  }

  getPriceBySku(sku) {
    const bagels = Inventory.filter((item) => item.sku === sku)
    if (bagels.length === 0) {
      return 'bagel not found'
    }
    return bagels[0].price
  }

  getTotal() {
    const totaler = (total, item) => total + item.quantity * item.item.price
    return this.items.reduce(totaler, 0)
  }
}

module.exports = Basket
