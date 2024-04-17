const { MongoClient, ServerApiVersion } = require("mongodb");

const server = require("./index.js")

const client = new MongoClient(server.DBurl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        poolSize: 15
    }
});

const database = client.db(server.DBname);
usersCollection = database.collection("users");


function getUsers() {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                usersCollection
                    .find()
                    .toArray()
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error getting users: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function addUser(user) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                usersCollection
                    .insertOne(user)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error adding user: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

module.exports = {
    getUsers,
    addUser
}