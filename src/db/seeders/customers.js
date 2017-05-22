

const seed = async (mongoose) => {
  const Customer = mongoose.model('Customer')
  console.log('=== CUSTOMERS ===')

  for (let customer of customers) {
    try {
      console.log(customer.name)
      const res = await new Customer(customer).save()
      console.log(`ID: ${res._id}`)
    } catch (err) {
      console.error('ERROR in customers: ' + err)
    }
  }
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
