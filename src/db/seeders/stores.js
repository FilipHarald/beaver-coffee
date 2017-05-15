const seed = (mongoose) => {
  console.log('=== STORES ===')
  const Store = mongoose.model('Store')
  return Promise.all(stores.map(async (store) => {
    console.log('-' + store.name)
    return await new Store(store).save()
    .catch((err) => {
      console.error('ERROR: ' + err);
    })
  }))
}

const stores = [
  {
    name: 'BeaverCoffee Malmö',
    location: {
      address: 'Lolvägen 1',
      zip: '1337',
      country: {
        name: 'Sweden',
        currency: 'SEK',
        countryCode: 'SE'
      }
    },
    stock: [
      {
        name: 'Coffee Beans',
        productType: 'Ingredient',
        unit: 'kg',
        amount: 50
      },
      {
        name: 'Milk',
        productType: 'Ingredient',
        unit: 'liter',
        amount: 25
      }
    ],
    employees: [
      {
        personId: '19861212-3939',
        name: 'Albert Einstein',
        location: {
          address: 'Alalalal',
          zip: '1234',
          country: {
            name: 'Germany'
          }
        },
        position: {
          name: 'Cashier',
          workPrecentage: 100
        }
      },
      {
        personId: '19991212-3939',
        name: 'Bruce Wayne',
        location: {
          address: 'Waynes Mannor',
          zip: '222333',
          country: {
            name: 'USA'
          }
        },
        position: {
          name: 'Manager',
          workPrecentage: 100
        }
      }
    ]
  },
]

export default {
  seed
}
