const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 2100;

// middleware
app.use(cors());
app.use(express.json());

//check server :
app.get('/', (req, res) => res.send("node is open"))

//database :
const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const Mongodb = () => {
    try {
        client.connect();
        console.log('datbase Connected');
    } catch (error) {
        console.log(error.name, error.message)
    }
};
Mongodb();

const User = client.db("food-Zone").collection("users");

//registation :
app.post("/user", async (req, res) => {
    const cursor = req.body;
    try {
        const users = await User.insertOne(cursor);
        res.send({
            success: true,
            data: users
        })
    } catch (error) {
        console.log(error.name, error.message);
    }
})
app.listen(port, () => console.log(port, "port is open"))