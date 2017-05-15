const seed = (mongoose) => {
  const Product = mongoose.model('Product')
  console.log('...products')
  return Promise.all(products.map(async (product) => {
    console.log(product.name)
    return await new Product(product).save()
    .catch((err) => {
      console.error('ERRR!!!: ' + err);
    })
  }))
}

const products = [
  {
    name: 'Coffee Beans',
    type: 'Ingredient',
    unit: 'kg'
  },{
    name: 'Small Brew Coffee',
    type: 'Product',
    unit: 'pcs',
    price: {
      se: 20,
      en: 2.5
    }
  }
]

export default {
  seed
}
