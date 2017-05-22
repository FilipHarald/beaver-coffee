const seed = async (mongoose) => {
  const Order = mongoose.model('Order')
  const Store = mongoose.model('Store')

  console.log('=== ORDERS ===')
  const store = await Store.findOne()
  for (let order of orders) {
    try {
      const customer = await mongoose.model('Customer').findOne()
      const employee = store.employees[0]

      order.customer = customer._id
      order.cashier = employee._id

      store.orders.push(order)
      await store.save()
      console.log(`Order saved`)
    } catch (err) {
      console.log('ERROR ORDERS: ' + err)
    }
  }
}

const orders = [
  {
    total: 130,
    items: [
      {
        name: 'Big Brew Coffee',
        productType: 'Product',
        unit: 'pcs',
        price: 30,
        amount: 3
      },
      {
        name: 'Small Latte',
        productType: 'Product',
        unit: 'pcs',
        price: 40,
        amount: 1
      },
    ]
  },
  {
    total: 20,
    items: [
      {
        name: 'Small Brew Coffee',
        productType: 'Product',
        unit: 'pcs',
        price: 20,
        amount: 1
      }
    ]
  }
]

export default {
  seed
}
