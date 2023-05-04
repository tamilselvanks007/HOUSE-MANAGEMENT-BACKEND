import express from "express";
import {
  createTenants,
  readAllTenants,
  readTenantById,
  updateTenantById,
  deleteTenantById,
} from "../helper.js";

const router = express.Router(); // we need to create a router object to use the router method in express

// Create Method (POST)
// creting a server for post tenants
router.post("/", async function (req, res) {
  const data = req.body;
  const result = await createTenants(data);
  res.send(result);
});

// Read Method (GET)
// creating a server for read all tenants

router.get("/", async function (req, res) {
  const result = await readAllTenants();
  res.send(result);
});

// creating a server for read tenants by id
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const result = await readTenantById(id);
  result
    ? res.send(result)
    : res.status(404).send({ message: "No such tenant found" });
});

//  Update Method (PUT)
// creating a server for update tenents details by id
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const updateDate = req.body;
  const result = await updateTenantById(id, updateDate);
  res.send(result);
});

// Delete Method (DELETE)
// creating a server for delete tenants by id
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const result = await deleteTenantById(id);
  res.send(result);
});

export const tenantsRouter = router;
