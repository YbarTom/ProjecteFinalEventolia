const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const usersDB = require("./users.js")
const postsDB = require("./posts.js")
const evenstDB = require("./events.js")
const commentsDB = require("./comments.js")

const predeterminedProfilePic = "data:image/jpeg;base64,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"

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

//#region USERS

app.get("/getUsers", async (req, res) => {
    try {
        const users = await usersDB.getUsers()
        res.json(users)
    } catch (error) {
        console.error("Error getting users", error)
    }
})

app.post("/createUser", async (req, res) => {
    try {
        const user = req.body

        user.posts = []
        user.followers = []
        user.followed = []
        user.events = []
        user.profilePic = predeterminedProfilePic
        user.privacity = false

        await usersDB.createUser(user)
    } catch (error) {
        console.error("Error creating user", error)
    }
})

app.post("/getUserById", async (req, res) => {
    try {
        const idUser = req.body
        await usersDB.getUserById(idUser)
    } catch (error) {
        console.error("Error getting user", error)
    }
})

app.post("/followUser", async (req, res) => {
    try {
        const data = req.body
        await usersDB.followUser(data.idFollower, data.idFollowed)
    } catch (error) {
        console.error("Error following user", error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const loggedIn = await usersDB.login(data);
        if (loggedIn) {
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid email or password");
        }
    } catch (error) {
        console.error("Error login", error);
        res.status(500).send("Internal Server Error");
    }
});

//#region POSTS:

app.get("/getPosts", async (req, res) => {
    try {
        const posts = await postsDB.getPosts()
        res.json(posts)
    } catch (error) {
        console.error("Error getting posts", error)
    }
})

app.post("/likePost", async (req, res) => {
    try {
        const data = req.body
        await postsDB.likePost(data.idUser, data.idPost)
    } catch (error) {
        console.error("Error liking post", error)
    }
})

app.post("/createPost", async (req, res) => {
    try {
        const post = req.body

        post.likes = []
        post.comments = []

        await postsDB.createPost(post)
    } catch (error) {
        console.error("Error creating post", error)
    }
})

app.post("/getPostById", async (req, res) => {
    try {
        const idPost = req.body
        const post = await postsDB.getPostById(idPost)
        res.json(post)
    } catch (error) {
        console.error("Error creating post", error)
    }
})

app.post("/getPostByIdUser", async (req, res) => {
    try {
        const idUser = req.body
        const post = await postsDB.getPostByIdUser(idUser)
        res.json(post)
    } catch (error) {
        console.error("Error creating post", error)
    }
})

//#region EVENTS:

app.post("/createEvent", async (req, res) => {
    try {
        const data = req.body

        data.assistants = []
        data.posts = []
        data.likes = []

        await evenstDB.createEvent(data)
    } catch (error) {
        console.error("Error creating event", error)
    }
})


//#region COMMENTS:

app.post("/createComment", async (req, res) => {
    try {
        const data = req.body
        await commentsDB.createComment(data)
    } catch (error) {
        console.error("Error adding comment", error)
    }
})






