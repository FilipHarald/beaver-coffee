const seed = (mongoose) => {
  const Customer = mongoose.model('Customer')
  console.log('...customers')
  return Promise.all(customers.map(async (customer) => {
    console.log(customer.name)
    return await new Customer(customer).save()
    .catch((err) => {
      console.error('ERRR!!!: ' + err);
    })
  }))
}

const customers = [
  {
    personId: '881010-1122',
    registrationDate: new Date(),
    name: 'Kalle Kula',
    occupation: 'Kulare',
    location: {
      address: 'Kulgatan 1',
      zip: 1337,
      country: {
        name: 'Svea rike'
      }
    },
    clubCard: {
      number: 123456,
      country: 'Svea rike',
      orders: 0,
    }
  }
]

export default {
  seed
}
