const seed = async (mongoose) => {
  const Store = mongoose.model('Store')
  console.log('...stores')
  const stores = await getStores(mongoose)
  return Promise.all(stores.map(async (store) => {
    console.log(store.name)
    return await new Store(store).save()
    .catch((err) => {
      console.error('ERRR!!!: ' + err);
    })
  }))
}

async function getStores(mongoose) {
  const Customer = mongoose.model('Customer')
  const customerId = (await Customer.findOne({ name: 'Kalle Kula' }))._id

  return [
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
            zip: 1234,
            country: {
              name: 'Germany'
            }
          },
          position: {
            name: 'Cashier',
            startDate: new Date(),
            workPrecentage: 100
          }
        }
      ],
      orders: [

      ],
    },
  ]
}
/*
const orders = [
  {
    date: new Date(),
    customer: ,
    cashier: {
      TODO
    },
    items: [
      { name: 'Latte', productType: 'Product', price: { se: '60' } },
      { name: 'Kaka', productType: 'Product', price: { se: '30' } },
      { name: 'Bulle', productType: 'Product', price: { se: '40' } },
    ]
  }
]
*/
export default {
  seed
}
