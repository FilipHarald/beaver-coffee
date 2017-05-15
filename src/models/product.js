import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
  type: String,
  name: String,
  price: Object,
  amount: {
    unit: String,
    value: Number
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    required: false
  }
})

helper.makeFieldsRequired(schema)

export default schema
