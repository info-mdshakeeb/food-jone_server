const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 2100;

// middleware
app.use(cors());
app.use(express.json());

//chake server :
app.get('/', (req, res) => res.send("node is open"))



app.listen(port, () => console.log(port, "port is openå"))