const seed = (mongoose) => {
  console.log('=== CUSTOMERS ===')
  const Customer = mongoose.model('Customer')
  return Promise.all(customers.map(async (customer) => {
    console.log('-' + customer.name)
    return await new Customer(customer).save()
    .catch((err) => {
      console.error('ERROR: ' + err);
    })
  }))
}

const customers = [
  {
    personId: '881010-1122',
    name: 'Kalle Kula',
    occupation: 'Kulare',
    location: {
      address: 'Kulgatan 1',
      zip: '1337',
      country: {
        name: 'Sweden'
      }
    },
    clubCard: {
      number: 123456,
      country: 'Sweden',
      orders: 0,
    }
  }
]

export default {
  seed
}
