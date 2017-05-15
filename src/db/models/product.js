import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
  type: {
    type: String,
    enum: ['Product', 'Ingredient']
  },
  name: String,
  price: {
    type: Object,
    required: false
  },
  unit: String,
  ingredients: {
    type: [{
        product: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'Product',
        },
        amount: Number
      }],
    required: false
  },
})

helper.makeFieldsRequired(schema)

export default schema
