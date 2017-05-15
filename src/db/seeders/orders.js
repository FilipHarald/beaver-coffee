const seed = (mongoose) => {
  console.log('=== ORDERS ===')
  const Customer = mongoose.model('Customer')
  const Employee = mongoose.model('Employee')
  const Order = mongoose.model('Order')
  return Customer.findOne({}).exec()
  .then((customer) => {
    console.log('found');
    orders.map((order) => {
      order.customer = customer._id
    })
    return Employee.findOne({}).exec()
  }).then(() => {
    orders.map((order) => {
      order.employee = employee._id
    })
    return Promise.all(orders.map((order, n) => {
      console.log('-' + n)
      return new Order(order).save()
    }))
  })
  .catch((err) => {
    console.error('ERROR: ' + err);
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
