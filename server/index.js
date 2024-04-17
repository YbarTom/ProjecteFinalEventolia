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
    console.log("Server running on port: ", PORT)
});


app.get("/getUsers", async (req, res) => {
    try {
        const users = await usersDB.getUsers()
        console.log(users)
        res.send(users)
    } catch (error) {
        console.error("Error getting users", error)
    }
})

app.post("/addUser", async (req, res) => {
    try {
        const user = req.body
        await usersDB.addUser(user)
    } catch (error) {
        console.error("Error adding user", error)
    }
})