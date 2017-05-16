const seed = async (mongoose) => {
  console.log('=== CUSTOMERS ===')
  const Customer = mongoose.model('Customer')
  return await Promise.all(customers.map((customer) => {
    console.log('-' + customer.name)
    return new Customer(customer).save()
    .then((res) => {
      console.log('Customer stored!' + res)
      return Promise.resolve(res)
    })
    .catch((err) => {
      console.error('ERROR in customers: ' + err)
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
