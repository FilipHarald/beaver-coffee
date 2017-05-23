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

const fullStock = [
  {
    name: '2% Milk',
    productType: 'Ingredient',
    unit: 'liter',
    amount: 50,
  },
  {
    name: 'Espresso Roast',
    unit: 'kg',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Whole Bean French Roast',
    unit: 'kg',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Whole Bean Light Roast',
    unit: 'kg',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Espresso Roast',
    unit: 'kg',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Cocoa Mix',
    unit: 'kg',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Skim Milk',
    unit: 'liter',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Soy Milk',
    unit: 'liter',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Whole Milk',
    unit: 'liter',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: '2% Milk',
    unit: 'liter',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Cream',
    unit: 'kg',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Vanilla Syrup',
    unit: 'liter',
    productType: 'Ingredient',
    amount: 50,
  },
  {
    name: 'Irish Cream Syrup',
    unit: 'liter',
    productType: 'Ingredient',
    amount: 50,
  }
]

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
  stock: fullStock,
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
    positions: [{
      name: 'Cashier',
      workPercentage: 100
    }]
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
    positions: [{
      name: 'Manager',
      workPercentage: 100
    }]
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
    positions: [{
      name: 'Cashier',
      workPercentage: 50
    }],
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
  stock: fullStock,
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
    positions: [{
      name: 'Cashier',
      workPercentage: 100
    }]
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
    positions: [{
      name: 'Manager',
      workPercentage: 100
    }]
  }
  ]
},
]

export default {
  seed
}
