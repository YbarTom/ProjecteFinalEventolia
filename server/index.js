const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const app = express();

const usersDB = require("./users.js")
const postsDB = require("./posts.js")
const eventsDB = require("./events.js")
const commentsDB = require("./comments.js")
const chatsDB = require("./chats.js")
const notificationsDB = require("./notifications.js")

const bodyParserOptions = {
    limit: "50mb" // Cambia el valor según tus necesidades
};
const predeterminedProfilePic = "data:image/jpeg;base64,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"

app.use(cors());

// Creem el servidor de Socket.io especificant que pot accedir qualsevol client
const server = http.createServer(app);

//#region SOCKETS

const io = new Server(server, {
    cors: {
        origin: '*', // Replace with the actual origin of your client application
        methods: ['GET', 'POST'],
    }
});

// Codi del servidor del chat
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', (roomName) => {
        socket.join(roomName); // Úne al usuario a la sala correspondiente
        console.log(`User joined room: ${roomName}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log(msg)
        io.to(msg.room).emit('chat message', msg); // Envía el mensaje a todos los usuarios en la sala
    });
});


app.use(bodyParser.json(bodyParserOptions));

const PORT = 3001;
server.listen(PORT, () => {
    console.log('Server running on port: ', PORT);
});

//#region USERS

app.get("/getUsers", async (req, res) => {
    try {
        const users = await usersDB.getUsers();
        res.status(200).json(users); // Set status and send response in correct order
    } catch (error) {
        console.error("Error getting users", error);
        res.status(500).json({ error: "Internal Server Error" }); // Send an error response with status code 500
    }
});


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
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
})

app.post("/getUserById", async (req, res) => {
    try {
        const idUser = req.body
        const user = await usersDB.getUserById(idUser)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error getting user" });
    }
})

app.post("/getUserByName", async (req, res) => {
    try {
        const userName = req.body.userName
        const user = await usersDB.getUserByName(userName)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error getting user" });
    }
})

app.post("/getUserByEmailName", async (req, res) => {
    try {
        const email = req.body.email
        const user = await usersDB.getUserByEmail(email)
        res.status(200).json(user.userName);
    } catch (error) {
        res.status(500).json({ error: "Error getting user" });
    }
})


app.post("/followUser", async (req, res) => {
    try {
        const data = req.body.data
        await usersDB.followUser(data.idFollower, data.idFollowed)
        createNotification({ type: "follow", follower: data.idFollower, followed: data.idFollowed })
        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error following user" });
    }
})

app.post("/unfollowUser", async (req, res) => {
    try {
        const data = req.body.data
        await usersDB.unfollowUser(data.idFollower, data.idFollowed)
        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error unfollowing user" });
    }
})

app.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const loggedIn = await usersDB.login(data.userInfo);
        if (loggedIn) {
            const user = await usersDB.getUserByEmail(data.userInfo.email)
            res.status(200).json(user)
        } else {
            res.status(401).json("not ok");
        }
    } catch (error) {
        console.error("Error login", error);
        res.status(500).json("Internal Server Error");
    }
});

app.post("/getFollowers", async (req, res) => {
    try {
        const data = req.body.followers
        const response = []
        for (let i = 0; i < data.length; i++) {
            response.push(await usersDB.getUserById(data[i]))
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Error getting followers" });
    }
})

app.post("/getFollowed", async (req, res) => {
    try {
        const data = req.body.followed
        const response = []
        for (let i = 0; i < data.length; i++) {
            response.push(await usersDB.getUserById(data[i]))
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Error getting followed" });
    }
})

app.post("/editPassword", async (req, res) => {
    try {
        const data = req.body.data
        usersDB.editPassword(data.idUser, data.password)
        const user = await usersDB.getUserById(data.idUser)

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error editing password" });
    }
})

app.post("/editUserName", async (req, res) => {
    try {
        const data = req.body.data
        usersDB.editUserName(data.idUser, data.userName)
        postsDB.editUserName(data.idUser, data.userName)
        eventsDB.editUserName(data.idUser, data.userName)
        commentsDB.editUserName(data.idUser, data.userName)

        const user = await usersDB.getUserById(data.idUser)

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error editing userName" });
    }
})
//#region CHATS:

app.post("/getChats", async (req, res) => {
    try {
        const data = req.body.idChats
        const chats = []
        for (let i = 0; i < data.length; i++) {
            chats.push(await chatsDB.getChatsById(data[i]))
        }
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: "Error getting chats" });
    }

})

app.post("/postMessageChat", async (req, res) => {
    try {
        const room = req.body.room
        const message = req.body.message
        const user = req.body.user
        const type = req.body.type
        await chatsDB.postMessageChat(room, message, user, type)
        res.status(200).json({ message: "Message posted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error posting message" });
    }
})

app.post("/postPostChat", async (req, res) => {
    try {
        const room = req.body.room
        const post = req.body.post
        const user = req.body.user
        const type = req.body.type
        await chatsDB.postPostChat(room, post, type, user)
        res.status(200).json({ message: "Post posted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error posting post" });
    }
})

app.post("/checkChat", async (req, res) => {
    try {
        const data = req.body.users
        const response = await chatsDB.checkChat(data.user1, data.user2)
        if (!response) {
            const chat = {
                room: data.user1.userName + data.user2.userName,
                users: [
                    data.user1.email,
                    data.user2.email
                ],
                messages: []
            }
            const idChat = await chatsDB.createChat(chat)
            console.log(idChat)
            await usersDB.addChat(data.user1.id, idChat)
            await usersDB.addChat(data.user2.id, idChat)
        }
        //res.status(200).json({ message: "Message posted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error posting message" });
    }
})
//#region POSTEVENT:

app.post("/getPostsEvents", async (req, res) => {
    try {
        const data = req.body
        const posts = await postsDB.getPostsByIdUser(data.idUser)
        const events = await eventsDB.getEventsByIdUser(data.idUser)
        const postsEvents = [...posts, ...events]

        postsEvents.sort((a, b) => {
            const dateA = new Date(a.publicationDate);
            const dateB = new Date(b.publicationDate);
            return dateB - dateA;
        });

        res.status(200).json(postsEvents);
    } catch (error) {
        res.status(500).json({ error: "Error getting posts and events" });
    }

});

//#region POSTS:

app.get("/getPosts", async (req, res) => {
    try {
        const posts = await postsDB.getPosts()
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error getting posts" });
    }
})

app.post("/likePost", async (req, res) => {
    try {
        const data = req.body.likeInfo
        await postsDB.likePost(data.idUser, data.idPost)
        res.status(200).json({ message: "Post liked successfully" });
        createNotification({ type: "likePost", post: data.idPost, liker: data.idUser })
    } catch (error) {
        res.status(500).json({ error: "Error liking post" });
    }
})

app.post("/dislikePost", async (req, res) => {
    try {
        const data = req.body.likeInfo
        await postsDB.dislikePost(data.idUser, data.idPost)
        res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error disliking post" });
    }
})

app.post("/deletePost", async (req, res) => {
    try {
        const data = req.body.idPost
        await postsDB.deletePost(data)
    } catch (error) {
        console.error(error)
    }
})

app.post("/createPost", async (req, res) => {
    try {
        const post = req.body.post

        post.likes = []
        post.comments = []
        post.publicationDate = new Date()

        await postsDB.createPost(post)
        res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
})

app.post("/getPostById", async (req, res) => {
    try {
        const idPost = req.body
        const post = await postsDB.getPostsById(idPost)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Error getting post" });
    }
})

app.post("/getPostsByIdUser", async (req, res) => {
    try {
        const idUser = req.body.idUser
        const post = await postsDB.getPostsByIdUser(idUser)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Error getting post" });
    }
})

app.post("/getFollowingPage", async (req, res) => {
    try {
        const data = req.body;
        const user = data.user

        const [posts, events] = await Promise.all([
            postsDB.getPostsByIdUsers(user.followed),
            eventsDB.getEventsByIdUsers(user.followed)
        ]);

        const followingPage = [...posts, ...events];

        followingPage.sort((a, b) => {
            const dateA = new Date(a.publicationDate);
            const dateB = new Date(b.publicationDate);
            return dateB - dateA;
        });

        res.status(200).json(followingPage);
    } catch (error) {
        res.status(500).json({ error: "Error getting following page" });
    }
});

//#region EVENTS:
app.get("/getEvents", async (req, res) => {
    try {
        const events = await eventsDB.getEvents()
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Error getting events" });
    }
})

app.post("/createEvent", async (req, res) => {
    try {
        const data = req.body
        const event = data.event
        event.assistants = []
        event.posts = []
        event.likes = []
        event.publicationDate = new Date()


        await eventsDB.createEvent(event)
        res.status(200).json({ message: "Event created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error creating event" });
    }
})

app.post("/addAssist", async (req, res) => {
    try {
        const data = req.body.assistInfo
        await eventsDB.addAssist(data.idEvent, data.idUser)
        createNotification({ type: "newAssist", event: data.idEvent, assistant: data.idUser })
        res.status(200).json({ message: "Assistance updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error assistance update" });
    }
})

app.post("/removeAssist", async (req, res) => {
    try {
        const data = req.body.assistInfo

        await eventsDB.removeAssist(data.idEvent, data.idUser)
        res.status(200).json({ message: "Assistance updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error assistance update" });
    }
})

app.post("/getEventsByIdUser", async (req, res) => {
    try {
        const idUser = req.body.idUser
        const post = await eventsDB.getEventsByIdUser(idUser)
        res.json(post)
    } catch (error) {
        console.error("Error creating post", error)
    }
})

app.post("/getAssistants", async (req, res) => {
    try {
        const idEvent = req.body
        const event = await eventsDB.getEventById(idEvent)
        const assistants = await usersDB.getAssistants(event.assistants)
        res.json(assistants)
    } catch (error) {
        console.error("Error getting assistants", error)
    }
})

app.post("/getEventById", async (req, res) => {
    try {
        const data = req.body
        const event = await eventsDB.getEventById(data.idEvent)
        res.status(200).json(event)
    } catch (error) {
        console.error("Error getting event", error)
    }
})

//#region COMMENTS:

app.post("/createComment", async (req, res) => {
    try {
        const data = req.body.comment
        await commentsDB.createComment(data)
        res.status(200).json({ message: "Comment created successfully" });
        createNotification({ type: "newComment", comment: data })
    } catch (error) {
        res.status(500).json({ error: "Error creating comment" });
    }
})

app.post("/getCommentsByIdPost", async (req, res) => {
    try {
        const data = req.body.idPost
        const comments = await commentsDB.getCommentsByIdPost(data)
        res.status(200).json(comments)
    } catch (error) {
        console.error("Error getting comments", error)
    }
})

//#region NOTIFICATIONS:

async function createNotification(notification) {

    var post
    var newNotification

    switch (notification.type) {
        case "newComment":
            post = await postsDB.getPostsById(notification.comment.idPost)
            newNotification = { notificated: post.idUser, type: "newComment", text: notification.comment.text, notificator: notification.comment.userName }
            notificationsDB.createNotification(newNotification)
            break;
        case "follow":
            const userFollower = await usersDB.getUserById(notification.follower)
            newNotification = { notificated: notification.followed, type: "follow", notificator: userFollower.userName }
            notificationsDB.createNotification(newNotification)
            break;
        case "likePost":
            post = await postsDB.getPostsById(notification.post)
            const userLiker = await usersDB.getUserById(notification.liker)
            newNotification = { notificated: post.idUser, type: "likePost", notificator: userLiker.userName }
            notificationsDB.createNotification(newNotification)
            break;
        case "newAssist":
            const event = await eventsDB.getEventById(notification.event)
            const userAssistant = await usersDB.getUserById(notification.assistant)
            newNotification = { notificated: event.idUser, type: "newAssist", notificator: userAssistant.userName }
            notificationsDB.createNotification(newNotification)
            break;
    }
}

app.post("/getNotificationsByIdUser", async (req, res) => {
    try {
        const data = req.body.idUser
        const notifications = await notificationsDB.getNotificationsByIdUser(data)
        res.status(200).json(notifications)
    } catch (error) {
        console.error("Error getting notifications", error)
    }
})