import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

var app = express();

app.use(express.json()); // middleware

const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to Mongo");
  return client;
}
const client = await createConnection();

// Create Method (POST) 
// creting a server for post tenants
app.post("/tenants", async function (req, res) {
  const data = req.body;
  const result = await client
    .db("house-management")
    .collection("tenants")
    .insertMany(data);
  res.send(result);
});

// Read Method (GET)
// creating a server for home page
app.get("/", function (req, res) {
  res.send("Hello world!");
});

// creating a server for read all tenants
app.get("/tenants", async function (req, res) {
  const result = await client
    .db("house-management")
    .collection("tenants")
    .find({})
    .toArray();
  res.send(result);
});

// creating a server fo asyncr read tenants by id
app.get("/tenants/:id", async function (req, res) {
  const { id } = req.params;
  const result = await client
    .db("house-management")
    .collection("tenants")
    .findOne({ id: id });
  result
    ? res.send(result)
    : res.status(404).send({ message: "No such tenant found" });
});

// Delete Method (DELETE)
// creating a server for delete tenants by id
app.delete("/tenants/:id", async function (req, res) {
  const { id } = req.params;
  const result = await client
    .db("house-management")
    .collection("tenants")
    .deleteOne({ id: id });
  res.send(result);
});

//  Update Method (PUT)
// creating a server for update tenents details by id
app.put("/tenants/:id", async function (req, res) {
  const { id } = req.params;
  const updateDate = req.body;
  const result = await client
    .db("house-management")
    .collection("tenants")
    .updateOne({ id: id }, { $set: updateDate });
  res.send(result);
});

app.listen(PORT, () => console.log(`Server started in ${PORT}`));
