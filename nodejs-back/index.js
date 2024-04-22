const mongoose = require('mongoose');
const Product = require('./models/product.model')

const express = require('express');
const app = express();

app.use(express.json());


const uri = "mongodb+srv://matheusdiegoteixeira:T4Xh1erKserdj2HW@nodejs-study.yz8rpga.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-study";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri)
//     // await mongoose.connect(uri, clientOptions);
//     // await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

mongoose.connect(uri).then(() => {
  console.info("Connected to database!")
})

// starts server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('http://localhost:3000');
});

// get
app.get('/', (req, res) => {
  res.send('Hello from Node API');
});

//post
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body); // check if it fits the model
    res.status(200).json(product); // sends back the status and body
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// update a product
app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body)

    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// delete a product
app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    res.status(200).json("Product deleted successfully.")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})