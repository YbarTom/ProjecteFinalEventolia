const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const usersDB = require("./users.js")

app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});

const DBurl = "mongodb://a22miqdervil:Pedralbes23@ac-nzxncrt-shard-00-00.yfxmjwr.mongodb.net:27017,ac-nzxncrt-shard-00-01.yfxmjwr.mongodb.net:27017,ac-nzxncrt-shard-00-02.yfxmjwr.mongodb.net:27017/?replicaSet=atlas-g6ezpq-shard-0&ssl=true&authSource=admin";
const DBname = "EventoliaFinal";

module.exports = { DBurl, DBname };

app.get("/getUsers", async (req, res) => {
    try {
        const users = await usersDB.getUsers()
        res.send(users)
    } catch (error) {
        console.error("Error getting users", error)
    }
})