const { MongoClient, ServerApiVersion } = require("mongodb");

const DBurl = "mongodb://a22miqdervil:Pedralbes23@ac-nzxncrt-shard-00-00.yfxmjwr.mongodb.net:27017,ac-nzxncrt-shard-00-01.yfxmjwr.mongodb.net:27017,ac-nzxncrt-shard-00-02.yfxmjwr.mongodb.net:27017/?replicaSet=atlas-g6ezpq-shard-0&ssl=true&authSource=admin";
const DBname = "EventoliaFinal";

const client = new MongoClient(DBurl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        poolSize: 15
    }
});

const generalFunctions = require("./generalFunctions.js")

const database = client.db(DBname);
chatsCollection = database.collection("Chats")

function getChatsById(idChat) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                chatsCollection
                    .findOne({ id: idChat })
                    .then((chat) => {
                        resolve(chat);
                    })
                    .catch((error) => {
                        console.error("Error getting chat: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function postMessageChat(room, message, user, type) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                chatsCollection.updateOne
                    (
                        { room: room },
                        { $push: { messages: { sender: user, content: message, type: type } } }
                    )
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error posting message: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    }
    );
}

function postPostChat(room, post, type, user) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                chatsCollection.updateOne
                    (
                        { room: room },
                        { $push: { messages: { sender: user, content: post, type: type } } }
                    )
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error posting post: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    }
    );
}

function checkChat(user1, user2) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return chatsCollection.findOne({
                    users: {
                        $all: [user1.email, user2.email]
                    }
                });
            })
            .then((foundChat) => {
                if (foundChat) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                console.error("Error finding chat room: ", error);
                reject(error);
            })
            .finally(() => {
                // Close the connection after the operation is complete
                client.close();
            });
    });
}

async function createChat(chat) {
    try {
        await client.connect();
        const uniqueId = generalFunctions.generateUniqueId();
        chat.id = uniqueId;
        await chatsCollection.insertOne(chat);
        return uniqueId;
    } catch (error) {
        console.error("Error creating chat: ", error);
        throw error;
    }
}



module.exports = {
    getChatsById,
    postMessageChat,
    postPostChat,
    checkChat,
    createChat
}