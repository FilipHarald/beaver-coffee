const seed = (mongoose) => {
  console.log('=== ORDERS ===')
  return mongoose.model('Customer').findOne()
  .then((customer) => {
    console.log('No DB error in customer: ' + customer); // Customer can still be null.
    orders.map((order) => {
      order.customer = customer._id
    })
    return mongoose.model('Employee').findOne()
  }).then((employee) => {
    orders.map((order) => {
      order.employee = employee._id
    })
    return Promise.all(orders.map((order, n) => {
      console.log('-' + n)
      return new mongoose.model('Order')(order).save()
    }))
  })
  .catch((err) => {
    console.error('ERROR in orders: ' + err)
  })
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
