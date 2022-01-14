/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
class Basket {
  constructor() {
    this.basket = [];
  }

  checkBasket() {
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
