import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
  personId: {
    type: String,
    unique: true
  },
  name: String,
  location: {
      address: String,
      zip: String,
      country:{
        name: String
      }
  },
  positions: {
    type: [{
      name: String,
      startDate: {
        type: Date,
        default: (new Date())
      },
      endDate: {
        type: Date,
        required: false
      },
      workPercentage: Number
    }]
  },
  comments: {
    type: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Employee'
        },
        date: {
          type: Date,
          default: (new Date())
        },
        text: String
      }
    ],
    required: false
  }
})

helper.makeFieldsRequired(schema)

mongoose.model('Employee', schema)

export default schema
