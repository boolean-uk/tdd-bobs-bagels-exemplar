const Inventory = require('../inventory.json').inventory
const getBagelBySku = (sku) => Inventory.filter((item) => item.sku === sku)[0]

module.exports = {
  getBagelBySku: getBagelBySku
}
