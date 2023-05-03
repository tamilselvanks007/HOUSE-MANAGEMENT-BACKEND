import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { tenantsRouter } from "./routes/tenants.js";

dotenv.config();

var app = express();

app.use(cors()); // it allows to use the same url for all the requests(.com)

app.use(express.json()); // middleware - Set the json parser

const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to Mongo");
  return client;
}
export const client = await createConnection(); // create a connection to mongo

// Read Method (GET)
// creating a server for home page
app.get("/", function (req, res) {
  res.send(
    "➤ Hello and welcome to the house management system!🏠😊 <br/> <br/> ➤ Here you'll find all the information you need about your houses🏘️🏘️"
  );
});

app.use("/tenants", tenantsRouter);

app.listen(PORT, () => console.log(`Server started in ${PORT}`));
