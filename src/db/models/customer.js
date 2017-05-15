import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
  personId: {
    type: String,
    unique: true
  },
  registrationDate: {
    type: Date,
    default: (new Date())
  },
  name: String,
  occupation: String,
  location: {
    address: String,
    zip: String,
    country:{
      name: String
    }
  },
  clubCard: {
    sparse: true,
    required: false,
    type: {
      number: {
        type: Number,
        unique: true
      },
      country: String,
      orders: Number,
    }
  }
})

helper.makeFieldsRequired(schema)

export default schema
