const seed = (mongoose) => {
  const Product = mongoose.model('Product')
  console.log('...products')
  return Promise.all(products.map(async (product) => {
    console.log('-->' + product.name)
    return await new Product(product).save()
    .catch((err) => {
      console.error('ERROR: ' + err);
    })
  }))
}

const products = [
  {
    name: 'Coffee Beans',
    productType: 'Ingredient',
    unit: 'kg'
  },
  {
    name: 'Milk',
    productType: 'Ingredient',
    unit: 'liter'
  },
  {
    name: 'Small Brew Coffee',
    productType: 'Product',
    unit: 'pcs',
    price: {
      se: 20,
      en: 2.5
    },
    ingredients: [
      {
        name: 'Coffee Beans',
        unit: 'kg',
        amount: 0.008
      }
    ]
  },
  {
    name: 'Big Brew Coffee',
    productType: 'Product',
    unit: 'pcs',
    price: {
      se: 30,
      en: 3.3
    },
    ingredients: [
      {
        name: 'Coffee Beans',
        unit: 'kg',
        amount: 0.012
      }
    ]
  },
  {
    name: 'Small Latte',
    productType: 'Product',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Coffee Beans',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: 'Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Big Latte',
    productType: 'Product',
    unit: 'pcs',
    price: {
      se: 50,
      en: 5.9
    },
    ingredients: [
      {
        name: 'Coffee Beans',
        unit: 'kg',
        amount: 0.012
      },
      {
        name: 'Milk',
        unit: 'liter',
        amount: 0.4
      }
    ]
  }
]

export default {
  seed
}
