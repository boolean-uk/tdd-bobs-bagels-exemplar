const Bagel = require('./bagel')
const Item = require('./item')

class Basket {
  constructor() {
    this.items = []
    this.nextID = 1
  }

  addItem(type, price, quantity) {
    const bagel = new Bagel(type, price)
    const item = new Item(this.nextID, quantity, bagel)
    this.items.push(item)
    this.nextID++
    return item
  }

  getItems() {
    return this.items
  }

  removeItem(id) {
    let itemToRemove = null
    this.items = this.items.filter((item) => {
      if (item.id === id) {
        itemToRemove = item
        return false
      }
      return true
    })
    if (itemToRemove === null) {
      return 'item not found'
    }
    return itemToRemove
  }
}

module.exports = Basket
