const Inventory = require('../inventory.js')

class BulkBuyDiscount {

  constructor(quantity, type, price) {
    this.quantity = quantity
    this.type = type
    this.price = price
  }

  getDiscount(items) {
      const applicableItems = this.getApplicableItems(items)
      if (applicableItems.length === 0) {
        return 0
      }

      return this.discountQuantity(applicableItems) * this.deductionPerDiscount();
  }

  getDiscountedItems(items) {
    return this.getApplicableItems(items).splice(0, this.discountQuantity(items) * this.quantity)
  }

  getApplicableItems(items) {
    return items.filter(item => item.type === this.type)
  }

  discountQuantity(applicableItems) {
    return Math.floor(applicableItems.length / this.quantity);
  }

  deductionPerDiscount() {
    return (this.quantity * Inventory.getPrice(this.type)) - this.price
  }
}

module.exports = BulkBuyDiscount