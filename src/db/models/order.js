import mongoose from 'mongoose'

export default mongoose.Schema({
  orderItems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product'
  },
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
  store: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Store',
  },
  items: {
    type: [
        {
          name: String,
          type: String,
          price: Number,
          amount: {
            unit: String,
            value: Number
          }
        }
    ]
  }
})
