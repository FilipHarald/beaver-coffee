import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
  productType: {
    type: String,
    enum: ['Product', 'Ingredient']
  },
  name: String,
  price: {
    type: Object,
    required: false // Only used for Product
  },
  unit: String,
  ingredients: {
    type: [
      {
        name: String,
        unit: String,
        amount: Number
      }
    ],
    required: false // Only used for Product
  }
})

helper.makeFieldsRequired(schema)

mongoose.model('Product', schema)

export default schema
