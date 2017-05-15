import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
    name: String,
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location'
    },
    stock: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product'
    },
    employees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Employee'
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product'
    }
})

helper.makeFieldsRequired(schema)

export default schema
