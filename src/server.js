const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.port || 4000;

const routes = require("./route");

const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/api", routes);


mongoose.connect("mongodb://localhost:27017/restraunt",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("connection successful"))
.catch((err) => console.log(err));


app.listen(PORT, () => console.log("Example app listrening to port 4000"))
