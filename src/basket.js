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
    this.checkBasket();
  }
}

module.exports = Basket;
