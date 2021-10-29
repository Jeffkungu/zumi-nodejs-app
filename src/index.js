const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const Order = require('./models/order')
const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.post('/orders', async (req, res) => {
  const order = new Order(req.body)
  try {
    await order.save()
    res.status(201).send('Order Created \n' + order)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
    res.send(orders)
  } catch (err) {
    res.status(500).send()
  }
})

app.patch('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!order) {
      return res.status(404).send('Order not found')
    }
    res.send('Order Updated \n' + order)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).send("Order not found")
    }
    res.send('Order Deleted \n' + order)
  } catch (err) {
    res.status(400).send(err)
  }
})


app.post('/products', async (req, res) => {
  const product = new Product(req.body)
  try {
    await product.save()
    res.status(201).send('Product Created \n' + product)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (err) {
    res.status(500).send()
  }
})

app.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!product) {
      return res.status(404).send("Product not found")
    }
    res.send('Product Updated \n' + product)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).send('Product not found')
    }
    res.send('Product Deleted \n' + product)
  } catch (err) {
    res.status(400).send(err)
  }
})

app.listen(port, () => {
  console.log('Server is up on port : ' + port)
})
