const bagels = {
  plain : 1.99,
  cinnamon : 2.50,
  chocolate : 3.00
}

class Inventory {

  static getAll() {
    return bagels
  }

  static getPrice(type) {
    return bagels[type]
  }
}

module.exports = Inventory