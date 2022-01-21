const Inventory = require("../inventory.js")

class ComboDiscount {
  constructor(price, items) {
    this.price = price
    this.items = items
  }

  getDiscount(items) {
    return this.discountQuantity(items) * this.deductionPerDiscount()
  }

  getDiscountedItems(basketItems) {
    const quantity = this.discountQuantity(basketItems)

    const discounted = []
    for (const comboItem of this.items) {
      discounted.push(...basketItems.filter((basketItem) => basketItem.type === comboItem).splice(0, quantity))
    }

    return discounted
  }

  discountQuantity(basketItems) {
    let quantity = Number.MAX_SAFE_INTEGER
    for (const comboItem of this.items) {
      const itemQuantity = basketItems.filter((basketItem) => basketItem.type === comboItem).length
      if (!itemQuantity) {
        return 0
      }

      quantity = Math.min(quantity, itemQuantity)
    }

    return quantity
  }

  deductionPerDiscount() {
    let usualPrice = 0
    for (const item of this.items) {
      usualPrice += Inventory.getPrice(item)
    }

    return usualPrice - this.price
  }
}

module.exports = ComboDiscount
