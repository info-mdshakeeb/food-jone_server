const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
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
const Services = client.db("food-Zone").collection("services");
const Review = client.db("food-Zone").collection("review");

//registation data saVE :
app.post("/user", async (req, res) => {
    const cursor = req.body;
    try {
        const user = await User.insertOne(cursor);
        res.send({
            success: true,
            data: cursor
        })
        console.log(user)
    } catch (error) {
        console.log(error.name, error.message);
    }
})
app.get('/serviceSection', async (req, res) => {
    try {
        const serviceSection = await Services.find().limit(3).toArray();
        res.send({
            success: true,
            data: serviceSection
        })
    } catch (error) {
        console.log(error.name, error.message)
    }
})
//all services :
app.get("/Services", async (req, res) => {
    try {
        const services = await Services.find({}).toArray();
        res.send(
            {
                succerss: true,
                data: services
            }
        )
    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "Delate item faild"
            }
        )
    }
})
app.post("/addservices", async (req, res) => {
    const cursor = req.body;
    try {
        const reviews = await Services.insertOne(cursor);
        res.send({
            success: true,
            data: reviews
        })
    } catch (error) {
        console.log(error.name, error.message);
    }
})
app.get('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Services.findOne({ _id: ObjectId(id) });
        res.send(
            {
                succerss: true,
                data: service

            }
        )

    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "Delate item faild"
            }
        )
    }
})
//all reviews && filter with email :
app.get("/reviews", async (req, res) => {
    let query = {}
    if (req.query.email) {
        query = { email: req.query.email }
    }
    if (req.query.id) {
        query = { id: req.query.id }
    }
    try {
        const reviews = await Review.find(query).toArray();
        res.send(
            {
                succerss: true,
                data: reviews
            }
        )
    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "Delate item faild"
            }
        )
    }
})
//delete review :
app.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Review.deleteOne({ _id: ObjectId(id) });
        res.send(
            {
                succerss: true,
                data: user
            }
        )
    } catch (error) {
        console.log(error.name, error.message);
        res.send(
            {
                succerss: false,
                message: "Delate item faild"
            }
        )
    }
})
//update review :
app.patch("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Review.updateOne({ _id: ObjectId(id) }, { $set: req.body });
        if (result.matchedCount) {
            res.send({
                success: true,
                message: `successfully updated ${req.body.name}`,
            });
        } else {
            res.send({
                success: false,
                error: "Couldn't update  the product",
            });
        }
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
});
//singel product load :
app.get('/review/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findOne({ _id: ObjectId(id) })
        res.send({ success: true, data: review })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})
app.post("/reviews", async (req, res) => {
    const cursor = req.body;
    try {
        const reviews = await Review.insertOne(cursor);
        res.send({ success: true, data: reviews })
    } catch (error) {
        console.log(error.name, error.message);
    }
})
app.listen(port, () => console.log(port, "port is open"))