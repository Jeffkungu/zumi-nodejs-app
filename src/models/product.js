const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
  sku: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String },
  price: {
    type: Number,
    required: true,
    validate (value) {
      if (value < 0) {
        throw new Error('Price must be greater than zero')
      }
    }
  },
  quantity: {
    type: Number,
    validate (value) {
      if (value < 0) {
        throw new Error('Quantity must be greater than zero')
      }
    }
  },
  orderId: { type: String }
})

module.exports = Product
