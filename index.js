const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// HTTP Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload())

// Database Key
const uri = `mongodb+srv://${process.env.DB_Client}:${process.env.DB_User_Secret}@cluster0.amqnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Database Connect
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Function
async function run() {
    try {
        await client.connect();
        const mongo_base = client.db("test_backend");
        const user_list = mongo_base.collection("users");
        console.log("Connecting Database....... Done!");

        // Create user
        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await user_list.insertOne(user);
            res.send(result);
        });

        // Get user For friend Request
        app.get("/users", async (req, res) => {
            const cursor = user_list.find({});
            const users = await cursor.toArray(res.send(users));
        });

        // Get Single user for view and update profile
        app.get("/users/:id", async (req, res) => {
            const userId = req.params.id;
            const query = { _id: ObjectId(userId) };
            const user = await user_list.findOne(query);
            res.send(user);
        });

        // Update profile
        app.put("/users/:email", async (req, res) => {
            const email = req.params.email;
            const newData = req.body;
            const filter = { email };
            const options = { upsert: false };
            const updatedData = {
                $set: newData,
            };
            const result = await user_list.updateOne(
                filter,
                updatedData,
                options
            );
            res.send(result);
        });

        // Delete User
        app.delete("/users/:email", async (req, res) => {
            const email = req.params.email;
            const result = await user_list.deleteOne({ email });
            res.send(result);
        });
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

// Server Home
app.get("/", (req, res) => {
    res.send("Have a nice day!");
});

app.listen(port, () => {
    console.log("Running Port is:", port);
});
