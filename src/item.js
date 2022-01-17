const Bagel = require('./bagel')

class Item {
  constructor (id, quantity, item) {
    this.id = id
    this.quantity = quantity
    this.item = new Bagel(...Object.values(item))
  }
}

module.exports = Item
