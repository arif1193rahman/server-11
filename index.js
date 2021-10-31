const express = require("express");
const { MongoClient } = require("mongodb");
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

    const database = client.db("tourismWeb");
    // Services Collection
    const servicesCollection = database.collection("services");

    // Get API
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // Add Events
    app.post("/addEvents", async (req, res) => {
      
      const data = req.body;
      const result = await servicesCollection.insertOne(data);
      // console.log(
      //   `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      // );
      console.log( "got newuser", req.body);
      console.log(result)
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
