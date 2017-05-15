import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
    address: String,
    zip: String,
    country:{
      name: String,
      currency: {
        type: String,
        required: false
      },
      countryCode: {
        type: String,
        required: false
      }
    }
})

helper.makeFieldsRequired(schema)

export default schema
