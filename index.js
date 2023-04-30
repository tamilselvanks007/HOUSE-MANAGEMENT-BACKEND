import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

var app = express();

const PORT = 4000;

const tenants = [
  {
    id: "01",
    photo:
      "https://media.licdn.com/dms/image/C5103AQEy5nmBAjKtmA/profile-displayphoto-shrink_800_800/0/1579325872629?e=2147483647&v=beta&t=UDeznQ-zgBRzZEvxvRpUQPZU-uCW6CBBhP7sufyGdvY",
    number: "001",
    name: "Arjun",
    age: "36",
    mobile: "9839374899",
    aadhar: "3453-5444-3435",
    occupation: "Developer",
    location: "Chennai",
  },
  {
    id: "02",
    photo:
      "https://st3.depositphotos.com/10424330/13719/i/600/depositphotos_137194832-stock-photo-closeup-portrait-happy-smiling-young.jpg",
    number: "002",
    name: "Thiru",
    age: "30",
    mobile: "6392038992",
    aadhar: "3476-4667-3435",
    occupation: "Driver",
    location: "Theni",
  },
  {
    id: "03",
    photo:
      "https://t3.ftcdn.net/jpg/05/06/51/46/360_F_506514612_z8oBdrajxk5eE9WlDKjliXOp3k6XqTf7.jpg",
    number: "003",
    name: "Vimal",
    age: "37",
    mobile: "9739288378",
    aadhar: "3645-6455-3456",
    occupation: "Supervisor",
    location: "Coimbatore",
  },
  {
    id: "04",
    photo:
      "https://media.licdn.com/dms/image/C4D03AQG9OhW68go3Iw/profile-displayphoto-shrink_800_800/0/1612715669378?e=2147483647&v=beta&t=ggMUsdBefVSRx1kk0iTQJr8qFJ4V3CEMs7fzH9BH51E",
    number: "004",
    name: "Senthil",
    age: "45",
    mobile: "9748892877",
    aadhar: "3534-7534-4234",
    occupation: "Manager",
    location: "Annur",
  },
  {
    id: "05",
    photo:
      "https://media.istockphoto.com/id/825059228/photo/confident-engineer-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=UA9mQ1vepMxCghjg7it8Vef7haEp80EELcmjTDzKdcA=",
    number: "005",
    name: "Dhinesh",
    age: "32",
    mobile: "9372783728",
    aadhar: "3433-4342-3235",
    occupation: "Engineer",
    location: "Salem",
  },
  {
    id: "06",
    photo:
      "https://media.licdn.com/dms/image/C4D03AQEE8lI7diuamQ/profile-displayphoto-shrink_800_800/0/1653048140216?e=2147483647&v=beta&t=HLwMcCt7FPUSO4cMP0t5wnEXXy2mVX14UJnWDM6YgRc",
    number: "006",
    name: "Gopi",
    age: "40",
    mobile: "9368238923",
    aadhar: "3324-5674-3534",
    occupation: "Accountant",
    location: "Trichy",
  },
  {
    id: "07",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-W5jkgTHK6S8J0hE33GOxS8ITaHzdngy7_YJJSSLiL5U-FuwL9z2KB-VR77PKuly3lJE&usqp=CAU",
    number: "007",
    name: "Vasanth",
    age: "31",
    mobile: "9638277289",
    aadhar: "3323-5322-3212",
    occupation: "Designer",
    location: "Coimbatore",
  },
  {
    id: "08",
    photo:
      "https://i.pinimg.com/236x/07/15/6b/07156b4680962b650af1c6927c7019d5.jpg",
    number: "008",
    name: "Vishnu",
    age: "30",
    mobile: "9828712769",
    aadhar: "3643-5423-3543",
    occupation: "Dancer",
    location: "Chennai",
  },
  {
    id: "09",
    photo:
      "https://media.licdn.com/dms/image/C4D03AQEOLqtICHiNZw/profile-displayphoto-shrink_800_800/0/1659698787298?e=2147483647&v=beta&t=a3PbQYRTLeS3CTRGA5c9LHJUgO2-PbMvyZL9nsrpetw",
    number: "009",
    name: "Naveen",
    age: "29",
    mobile: "9783982973",
    aadhar: "3534-5433-3323",
    occupation: "Fashion Designer",
    location: "Bangalore",
  },
  {
    id: "10",
    photo:
      "https://img.freepik.com/premium-photo/mature-overweight-indian-businessman-suit-with-receding-hairline-white_251136-73537.jpg",
    number: "010",
    name: "Kumar",
    age: "48",
    mobile: "9628838027",
    aadhar: "3342-5423-3423",
    occupation: "Teacher",
    location: "Erode",
  },
];

app.use(express.json()); // middleware

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
