import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import {
  createTenants,
  readAllTenants,
  readTenantById,
  updateTenantById,
  deleteTenantById,
} from "./helper.js";

dotenv.config();

var app = express();

app.use(cors()); // used to access the data

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
export const client = await createConnection();

// Create Method (POST)
// creting a server for post tenants
app.post("/tenants", async function (req, res) {
  const data = req.body;
  const result = await createTenants(data);
  res.send(result);
});

// Read Method (GET)
// creating a server for home page
app.get("/", function (req, res) {
  res.send(
    "➤ Hello and welcome to the house management system!🏠😊 <br/> <br/> ➤ Here you'll find all the information you need about your houses🏘️🏘️"
  );
});

// creating a server for read all tenants
app.get("/tenants", async function (req, res) {
  const result = await readAllTenants();
  res.send(result);
});

// creating a server fo asyncr read tenants by id
app.get("/tenants/:id", async function (req, res) {
  const { id } = req.params;
  const result = await readTenantById(id);
  result
    ? res.send(result)
    : res.status(404).send({ message: "No such tenant found" });
});

// Delete Method (DELETE)
// creating a server for delete tenants by id
app.delete("/tenants/:id", async function (req, res) {
  const { id } = req.params;
  const result = await deleteTenantById(id);
  res.send(result);
});

//  Update Method (PUT)
// creating a server for update tenents details by id
app.put("/tenants/:id", async function (req, res) {
  const { id } = req.params;
  const updateDate = req.body;
  const result = await updateTenantById(id, updateDate);
  res.send(result);
});

app.listen(PORT, () => console.log(`Server started in ${PORT}`));
