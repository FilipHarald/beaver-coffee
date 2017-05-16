import mongoose from 'mongoose'

const schema = mongoose.Schema({
  date: {
    type: Date,
    default: (new Date())
  },
  customer: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Customer',
    required: false
  },
  cashier: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Employee',
  },
  items: {
    type: [
        {
          name: String,
          productType: String,
          price: Number,
          amount: Number,
          unit: String
        }
    ]
  }
})

mongoose.model('Order', schema)

export default schema
