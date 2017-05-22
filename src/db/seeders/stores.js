const seed = async (mongoose) => {
  const Store = mongoose.model('Store')

  console.log('=== STORES ===')
  for (let store of stores) {
    console.log(`- ${store.name}`)

    try {
      let res = await new Store(store).save()
      console.log(`Store ${store.name} saved`)
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
          workPrecentage: 50
        },
        comments: []
      }
    ]
  },
]

export default {
  seed
}
