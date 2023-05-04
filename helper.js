import { client } from "./index.js";

export async function createTenants(data) {
  return await client
    .db("house-management")
    .collection("tenants")
    .insertOne(data);
}

export async function readAllTenants() {
  return await client
    .db("house-management")
    .collection("tenants")
    .find({})
    .toArray(); // toArray() is used to convert cursor to array
}

export async function readTenantById(id) {
  return await client
    .db("house-management")
    .collection("tenants")
    .findOne({ id: id });
}

export async function updateTenantById(id, updateDate) {
  return await client
    .db("house-management")
    .collection("tenants")
    .updateOne({ id: id }, { $set: updateDate });
}

export async function deleteTenantById(id) {
  return await client
    .db("house-management")
    .collection("tenants")
    .deleteOne({ id: id });
}
