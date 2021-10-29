const mongoose = require('mongoose')

const Order = mongoose.model('Order', {
  orderNumber: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Canceled', 'Delivered'],
    default: 'Pending'
  },
  orderLines: {
    type: [{ sku: String, name: String, price: Number, quantity: Number }]
  }
})

module.exports = Order
