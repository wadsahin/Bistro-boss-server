const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
  res.send("Bistro boss is running....")
})

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.l0f7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection = client.db("BistroDb").collection("menu");
    const reviewCollection = client.db("BistroDb").collection("reviews");

    // Get APIs
    app.get("/menu", async(req, res) =>{
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/reviews", async(req, res) =>{
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })

    // Post APIs

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () =>{
  console.log(`Bistro boss hire on port ${port}`)
})