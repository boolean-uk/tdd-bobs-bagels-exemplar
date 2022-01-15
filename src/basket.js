/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
class Basket {
  constructor() {
    this.basket = [];
    this.basketSize = 5;
    this.basketTotal = [];
  }

  checkBasket() {
    if (this.basket.length > this.basketSize) return 'your basket is full';
    return this.basket;
  }

  addItem(item) {
    const inBasket = this.basket.map((el) => el.type).lastIndexOf(item.type);
    if (inBasket !== -1) {
      this.basket[inBasket].quantity++;
      return this.checkBasket();
    }
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
        return 2.5;
      case 'wheat':
        return 2.0;
      case 'sesame':
        return 2.2;
      default:
        return Error;
    }
  }

  checkout() {
    return this.basket
      .map((item) => item.quantity * item.price)
      .reduce((previous, current) => previous + current, 0);
  }
}
module.exports = Basket;
