const Inventory = require("./inventory.js")

const DefaultCapacity = 2

class Basket {
  constructor(capacity = DefaultCapacity) {
    this.capacity = capacity
    this.bagels = []
  }

  addBagel(type) {
    if (this.isFull()) {
      return "basket is full"
    }

    const price = Inventory.getPrice(type)
    if (!price) {
      return "bagel type does not exist"
    }

    this.bagels.push({ type: type, price: price })
  }

  isFull() {
    return this.bagels.length == this.capacity
  }

  removeBagel(type) {
    const bagelIndex = this.bagels.findIndex((item) => item.type == type)
    if (bagelIndex < 0) {
      return "bagel does not exist"      
    }

    this.bagels.splice(bagelIndex, 1)
  }

  getBagels() {
    return this.bagels
  }

  totalSum(discounts = []) {
    const totalDiscountSaving = this.getDiscountSavings(discounts)

    let price = 0
    for (const bagel of this.bagels) {
      price += bagel.price
    }

    return Number((price - totalDiscountSaving).toFixed(2))
  }

  getDiscountSavings(discounts) {
    let discountableBagels = [...this.bagels]
    let totalDiscountSaving = 0

    for (const discount of discounts) {
      const discountSaving = discount.getDiscount(discountableBagels)
      if (discountSaving > 0) {
        totalDiscountSaving += discountSaving
        discountableBagels = this.removedDiscounted(discountableBagels, discount.getDiscountedItems(discountableBagels))
      }
    }

    return totalDiscountSaving
  }

  removedDiscounted(discountableBagels, discounted) {
    return discountableBagels.filter((item) => !discounted.includes(item))
  }
}

module.exports = Basket
