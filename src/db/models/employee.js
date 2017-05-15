import mongoose from 'mongoose'
import helper from './_helper-functions'

let schema = mongoose.Schema({
  personId: {
    type: String,
    unique: true
  },
  name: String,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  position: {
    name: String,
    startDate: {
      type: Date,
      default: (new Date())
    },
    endDate: {
      type: Date,
      required: false
    },
    workPrecentage: Number
  },
  comments: {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    date: {
      type: Date,
      default: (new Date())
    },
    text: String
  }
})

helper.makeFieldsRequired(schema)

export default schema
