const seed = async (mongoose) => {
  const Store = mongoose.model('Store')

  console.log('=== STORES ===')
  for (let store of stores) {
    console.log(`- ${store.name}`)

    try {
      const res = await new Store(store).save()
      console.log(`ID: ${res._id}`)
    } catch (err) {
      console.error('ERROR IN STORES: ' + err);
    }
  }
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
        name: '2% Milk',
        productType: 'Ingredient',
        unit: 'liter',
        amount: 50
      },
      {
        name: 'Espresso Roast',
        productType: 'Ingredient',
        unit: 'kg',
        amount: 50
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
          workPercentage: 100
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
          workPercentage: 100
        }
      },
      {
        personId: '1337-7331',
        name: 'Winston Churchill',
        location: {
          address: 'Nottingham street 4',
          zip: '9001',
          country: {
            name: 'United Kingdom'
          }
        },
        position: {
          name: 'Cashier',
          workPercentage: 50
        },
        comments: []
      }
    ]
  },
  {
    name: 'BeaverCoffee Lund',
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
        name: '2% Milk',
        productType: 'Ingredient',
        unit: 'liter',
        amount: 10
      },
      {
        name: 'Espresso Roast',
        productType: 'Ingredient',
        unit: 'kg',
        amount: 60
      },
      {
        name: 'Cocoa Mix',
        productType: 'Ingredient',
        unit: 'kg',
        amount: 100
      }
    ],
    employees: [
      {
        personId: '19861212-393',
        name: 'Kalle Anka',
        location: {
          address: 'Alalalal',
          zip: '1234',
          country: {
            name: 'Germany'
          }
        },
        position: {
          name: 'Cashier',
          workPercentage: 100
        }
      },
      {
        personId: '19991212-393',
        name: 'Steve Rogers',
        location: {
          address: 'Waynes Mannor',
          zip: '222333',
          country: {
            name: 'USA'
          }
        },
        position: {
          name: 'Manager',
          workPercentage: 100
        }
      }
    ]
  },
]

export default {
  seed
}
