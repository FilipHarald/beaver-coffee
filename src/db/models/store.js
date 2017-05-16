import mongoose from 'mongoose'
import helper from './_helper-functions'
import Product from './product'
import Employee from './employee'
import Order from './order'

let schema = mongoose.Schema({
    name: String,
    location: {
        address: String,
        zip: String,
        country:{
          name: String,
          currency: String,
          countryCode: String
        }
    },
    stock: {
      type: [Product],
      required: false
    },
    employees: {
      type: [Employee],
      required: false
    },
    orders: {
      type: [Order],
      required: false
    }
})

helper.makeFieldsRequired(schema)

mongoose.model('Store', schema)

export default schema
