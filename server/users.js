const { MongoClient } = require("mongodb")

const server = require("./index.js")

const database = server.client.db(server.DBname);
users = database.collection("users");


function getUsers() {
    return new Promise((resolve, reject) => {
        server.client
            .connect()
            .then(() => {
                users
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
        server.client
            .connect()
            .then(() => {
                users
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