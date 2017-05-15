import mongoose from 'mongoose'
import helper from './_helper-functions'

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
