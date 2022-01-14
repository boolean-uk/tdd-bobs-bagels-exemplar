/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
class Basket {
  constructor() {
    this.basket = [];
    this.smallBasket = 5;
  }

  checkBasket() {
    if (this.basket.length > this.smallBasket) return 'your basket is full';
    return this.basket;
  }

  addItem(item) {
    this.basket.push(item);
    return this.checkBasket();
  }

  removeItem(id) {
    const filtered = this.basket.filter((item) => item.id !== id);
    this.basket = filtered;
    return this.checkBasket();
  }
}

module.exports = Basket;
