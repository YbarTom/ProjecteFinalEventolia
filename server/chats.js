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

function postMessageChat(room, message, user) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                chatsCollection.updateOne
                    (
                        { room: room },
                        { $push: { messages: { sender: user, content: message } } }
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

module.exports = {
    getChatsById,
    postMessageChat
}