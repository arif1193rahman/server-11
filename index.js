const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l9eit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// console.log("lol0000000000000",uri);

async function run() {
  try {
    await client.connect();
    // console.log('connect to the data base')

    const database = client.db("tourismWeb").collection("services");
   
    // Services Collection
    const bookingCollect = client.db("tourismWeb").collection("booking");
   

    // Get API
    app.get("/services", async (req, res) => {
      const cursor = database.find({});
      const services = await cursor.toArray();
      res.send(services);
    });
    // Get single
    app.get('/services/:id', async(req, res)=>{
      const id = req.params.id;
      console.log('getting specifi service', id)
      const query = {_id: ObjectId(id)};
      const services = await database.findOne(query);
      res.json(services);
    })

    // PostAPI
    app.post('/services',async(req, res)=>{
      const service = req.body;
      const result = await database.insertOne(service);
      res.json(result)
    });

    // UI Address get API
    app.get('/booking', async(req, res)=>{
      const cursor = bookingCollection.find({});
      const booking = await cursor.toArray();
      res.send(booking);

    });

    // Add Address
    app.post("/booking", async (req, res) => {
      const booking = req.body;
      // console.log("hit", booking);
      const result = await bookingCollect.insertOne(booking);
      // console.log(result);

      res.json(result);
    });
  } finally {
    // await clint.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
