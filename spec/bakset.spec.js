const Basket = require("../src/basket.js")
const Inventory = require("../src/inventory.js")
const BulkBuyDiscount = require("../src/discount/bulkbuy.js")
const ComboDiscount = require("../src/discount/combo.js")

describe("Basket", function () {
  let basket

  beforeEach(function () {
    basket = new Basket()
  })

  it("addBagel: Add single item with price", function () {
    //setup
    const expected = [{ type: "cinnamon", price: 2.5 }]

    // execute
    basket.addBagel("cinnamon")

    //We're checking via getBagels as addBagel returns nothing
    const bagels = basket.getBagels()

    // // verify
    expect(bagels).toEqual(expected)
  })

  it("addBagel: Add same type of bagel twice", () => {
    const expected = [
      { type: "cinnamon", price: 2.5 },
      { type: "cinnamon", price: 2.5 },
    ]

    // execute
    basket.addBagel("cinnamon")
    basket.addBagel("cinnamon")

    const bagels = basket.getBagels()

    // // verify
    expect(bagels).toEqual(expected)
  })

  it("addBagel: Add a second item item", () => {
    const expected = [
      { type: "cinnamon", price: 2.5 },
      { type: "plain", price: 1.99 },
    ]

    // execute
    basket.addBagel("cinnamon")
    basket.addBagel("plain")

    const bagels = basket.getBagels()

    // // verify
    expect(bagels).toEqual(expected)
  })

  it("addBagel: Add fails when basket is full", () => {
    //setup
    basket.addBagel("cinnamon")
    basket.addBagel("plain")

    // execute
    const result = basket.addBagel("chocolate")

    // // verify
    expect(result).toEqual("basket is full")
  })

  it("addBagel: Add fails with basket beyond provided capacity", () => {
    //Create a basked with a different capacity
    //and make sure we can't add bagels beyond that.

    const largeBasket = new Basket(3)

    //setup
    largeBasket.addBagel("cinnamon")
    largeBasket.addBagel("plain")
    largeBasket.addBagel("chocolate")

    // execute
    const result = largeBasket.addBagel("sesame")

    //verify
    expect(result).toEqual("basket is full")
    expect(largeBasket.getBagels().length).toEqual(3)
  })

  it("addBagel: Add does not add bagel to basket when basket is full", () => {
    //setup
    const expected = [
      { type: "cinnamon", price: 2.5 },
      { type: "plain", price: 1.99 },
      //chocolate should not be added
    ]

    basket.addBagel("cinnamon")
    basket.addBagel("plain")

    // execute
    basket.addBagel("chocolate")

    const result = basket.getBagels()

    // verify
    expect(result).toEqual(expected)
  })

  it("addBagel: Add fails when adding type that doesn't exist", () => {
    // execute
    const expected = basket.addBagel("idontexist!")

    // // verify
    expect("bagel type does not exist").toEqual(expected)
  })

  it("removeBagel: Remove item added", () => {
    basket.addBagel("cinnamon")
    basket.addBagel("plain")

    // execute
    basket.removeBagel("plain")

    // verify
    const expected = [{ type: "cinnamon", price: 2.5 }]

    const bagels = basket.getBagels()

    expect(bagels).toEqual(expected)
  })

  it("removeBagel: Remove returns error when item doesn't exist", () => {
    basket.addBagel("cinnamon")
    basket.addBagel("plain")

    // execute
    const result = basket.removeBagel("chocolate")

    // verify
    const expected = "bagel does not exist"

    expect(result).toEqual(expected)
  })

  it("totalSum: Returns total sum of items", () => {
    basket.addBagel("cinnamon")
    basket.addBagel("plain")

    // execute
    const result = basket.totalSum()

    // verify
    const expected = 4.49

    expect(result).toEqual(expected)
  })

  it("totalSum: 12 plain bagels costs 2.99", () => {
    const largeBasket = new Basket(20)

    //Add 12 plain bagels
    for (let i = 0; i < 12; i++) {
      largeBasket.addBagel("plain")
    }

    const discounts = [new BulkBuyDiscount(12, "plain", 2.99)]

    const result = largeBasket.totalSum(discounts)
    const expected = 2.99

    expect(result).toEqual(expected)
  })

  it("totalSum: bulk discount ignored when not applicable", () => {
    const largeBasket = new Basket(20)

    //Add 2 plain bagels
    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")

    //discount only applies to 3
    const discounts = [new BulkBuyDiscount(3, "plain", 2.99)]

    const result = largeBasket.totalSum(discounts)
    const expected = 1.99 * 2

    expect(result).toEqual(expected)
  })

  it("totalSum: test discount applied twice to same type", () => {
    const largeBasket = new Basket(20)

    //Add 4 plain bagels
    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")

    const discounts = [new BulkBuyDiscount(2, "plain", 0.1)]

    const result = largeBasket.totalSum(discounts)

    const expected = 0.2

    expect(result).toEqual(expected)
  })

  it("totalSum: test additional priced as normal", () => {
    const largeBasket = new Basket(20)

    //these 2 should be discounted
    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")

    //this one should be normal price
    largeBasket.addBagel("plain")

    const discounts = [new BulkBuyDiscount(2, "plain", 0.1)]

    const result = largeBasket.totalSum(discounts)

    const expected = 2.09

    expect(result).toEqual(expected)
  })

  it("totalSum: test discounts on multiple types", () => {
    const largeBasket = new Basket(20)

    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")

    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")

    const discounts = [new BulkBuyDiscount(2, "plain", 0.1), new BulkBuyDiscount(3, "chocolate", 0.5)]

    const result = largeBasket.totalSum(discounts)

    const expected = 0.6

    expect(result).toEqual(expected)
  })

  it("totalSum: test discounts combo type", () => {
    const largeBasket = new Basket(20)

    largeBasket.addBagel("plain")
    largeBasket.addBagel("chocolate")

    const discounts = [new ComboDiscount(0.5, ["plain", "chocolate"])]

    const result = largeBasket.totalSum(discounts)

    const expected = 0.5

    expect(result).toEqual(expected)
  })

  it("totalSum: test discounts combo type multiple times", () => {
    const largeBasket = new Basket(20)

    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")

    const discounts = [new ComboDiscount(0.5, ["plain", "chocolate"])]

    const result = largeBasket.totalSum(discounts)

    const expected = 1

    expect(result).toEqual(expected)
  })

  it("totalSum: test combo type non-included items priced as usual ", () => {
    const largeBasket = new Basket(20)

    largeBasket.addBagel("plain")
    largeBasket.addBagel("plain")
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")
    //this one not part of the combo deal
    largeBasket.addBagel("chocolate")

    const discounts = [new ComboDiscount(0.5, ["plain", "chocolate"])]

    const result = largeBasket.totalSum(discounts)

    const expected = 4.0

    expect(result).toEqual(expected)
  })

  it("totalSum: items are not applied to multiple discounts", () => {
    const largeBasket = new Basket(20)

    //Add 12 plain bagels - these should be discounted
    for (let i = 0; i < 12; i++) {
      largeBasket.addBagel("plain")
    }

    //Add 3 chocolate - these should not be discounted
    //as all the plain bagels have been included in the
    //the first discount
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")

    const discounts = [new BulkBuyDiscount(12, "plain", 1), new ComboDiscount(1, ["plain", "chocolate"])]

    const result = largeBasket.totalSum(discounts)

    //12x plain discount (1) + 3x single chocolate (3*3) = 10
    const expected = 10

    expect(result).toEqual(expected)
  })

  it("totalSum: test multiple discounts when combo first", () => {
    const largeBasket = new Basket(20)

    //Add 12 plain bagels - these should *not* be discounted
    //because the combo discount is applied first
    for (let i = 0; i < 12; i++) {
      largeBasket.addBagel("plain")
    }

    //Add 3 chocolate - these should be discounted
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")
    largeBasket.addBagel("chocolate")

    const discounts = [new ComboDiscount(1, ["plain", "chocolate"]), new BulkBuyDiscount(12, "plain", 1)]

    const result = largeBasket.totalSum(discounts)

    //3x single plain and chocolate (3*1) + 9 x plain (9*1.99) = 20.91
    const expected = 20.91

    expect(result).toEqual(expected)
  })
})
