/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
class Basket {
  constructor() {
    this.basket = [];
    this.basketSize = 5;
  }

  checkBasket() {
    if (this.basket.length > this.basketSize) return 'your basket is full';
    return this.basket;
  }

  addItem(item) {
    this.basket.push(item);
    return this.checkBasket();
  }

  removeItem(id) {
    const oldBasket = this.basket;
    const filtered = this.basket.filter((item) => item.id !== id);
    this.basket = filtered;
    if (oldBasket.length === this.basket.length) {
      return 'this item does not exist';
    }
    return this.checkBasket();
  }

  increaseBasket(size) {
    return (this.basketSize = size);
  }

  checkPrice(type) {
    switch (type) {
      case 'onion':
        return '£2.50';
      case 'wheat':
        return '£2.00';
      case 'sesame':
        return '£2.20';
      default:
        return Error;
    }
  }
}

module.exports = Basket;
