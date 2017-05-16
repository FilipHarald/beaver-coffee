const seed = async (mongoose) => {
  const Order = mongoose.model('Order')

  console.log('=== ORDERS ===')
  for (let order of orders) {
    try {
      const customer = await mongoose.model('Customer').findOne()
      const employee = await mongoose.model('Employee').findOne()

      order.customer = customer._id
      order.cashier = employee._id

      await new Order(order).save()
      console.log(`Order saved`)
    } catch (err) {
      console.log('ERROR ORDERS: ' + err)
    }
  }
}

const orders = [
  {
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
