const seed = async (mongoose) => {
  const Product = mongoose.model('Product')

  console.log('=== PRODUCTS ===')
  for (let product of [...ingredients,...products]) {
    console.log(`- ${product.name}`)
    try {
      let res = await new Product(product).save()
    } catch (err) {
      console.error('ERROR in products: ' + err);
    }
  }
}

let ingredients = [
  {
    name: 'Whole Bean French Roast',
    unit: 'kg'
  },
  {
    name: 'Whole Bean Light Roast',
    unit: 'kg'
  },
  {
    name: 'Espresso Roast',
    unit: 'kg'
  },
  {
    name: 'Cocoa Mix',
    unit: 'kg'
  },
  {
    name: 'Skim Milk',
    unit: 'liter'
  },
  {
    name: 'Soy Milk',
    unit: 'liter'
  },
  {
    name: 'Whole Milk',
    unit: 'liter'
  },
  {
    name: '2% Milk',
    unit: 'liter'
  },
  {
    name: 'Cream',
    unit: 'kg',
  },
  {
    name: 'Vanilla Syrup',
    unit: 'liter',
  },
  {
    name: 'Irish Cream Syrup',
    unit: 'liter',
  }
]

ingredients.forEach((ingredient) => {
  ingredient.productType = 'Ingredient'
})

let products = [
  {
    name: 'Brew Coffee',
    unit: 'pcs',
    price: {
      se: 20,
      en: 2.5
    },
    ingredients: [
      {
        name: 'Whole Bean French Roast',
        unit: 'kg',
        amount: 0.008
      }
    ]
  },
  {
    name: 'Espresso',
    unit: 'pcs',
    price: {
      se: 25,
      en: 3
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      }
    ]
  },
  {
    name: 'Skinny Latte',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: 'Skim Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Soy Latte',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: 'Soy Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Whole Milk Latte',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: '2% Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Latte',
    unit: 'pcs',
    price: {
      se: 35,
      en: 4
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: '2% Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Skinny Cappuccino',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: 'Skim Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Soy Cappuccino',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: 'Soy Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Whole Milk Cappuccino',
    unit: 'pcs',
    price: {
      se: 40,
      en: 4.5
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: 'Whole Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Cappuccino',
    unit: 'pcs',
    price: {
      se: 35,
      en: 4
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 0.008
      },
      {
        name: '2% Milk',
        unit: 'liter',
        amount: 0.3
      }
    ]
  },
  {
    name: 'Whole Bean French Roast',
    unit: 'kg',
    price: {
      se: 100,
      en: 12
    },
    ingredients: [
      {
        name: 'Whole Bean French Roast',
        unit: 'kg',
        amount: 1
      }
    ]
  },
  {
    name: 'Whole Bean Light Roast',
    unit: 'kg',
    price: {
      se: 100,
      en: 12
    },
    ingredients: [
      {
        name: 'Whole Bean Light Roast',
        unit: 'kg',
        amount: 1
      }
    ]
  },
  {
    name: 'Espresso Roast',
    unit: 'kg',
    price: {
      se: 100,
      en: 12
    },
    ingredients: [
      {
        name: 'Espresso Roast',
        unit: 'kg',
        amount: 1
      }
    ]
  },
  {
    name: 'Whipped Cream',
    unit: 'pcs',
    price: {
      se: 5,
      en: .5
    },
    ingredients: [
      {
        name: 'Cream',
        unit: 'kg',
        amount: 0.005
      }
    ]
  },
  {
    name: 'Vanilla Syrup',
    unit: 'pcs',
    price: {
      se: 5,
      en: .5
    },
    ingredients: [
      {
        name: 'Vanilla Syrup',
        unit: 'liter',
        amount: 0.01
      }
    ]
  },
  {
    name: 'Irish Cream Syrup',
    unit: 'pcs',
    price: {
      se: 5,
      en: .5
    },
    ingredients: [
      {
        name: 'Irish Cream Syrup',
        unit: 'liter',
        amount: 0.01
      }
    ]
  }
]

products.forEach((product) => {
  product.productType = 'Product'
})

export default {
  seed
}
