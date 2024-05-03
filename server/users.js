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
usersCollection = database.collection("Users")

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
                        console.error("Error getting users: ", error)
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error);
            });
    });
}

function createUser(user) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                // Check if user with same email or userName exists
                const query = {
                    $or: [
                        { email: user.email },
                        { userName: user.userName }
                    ]
                };
                usersCollection.findOne(query)
                    .then((existingUser) => {
                        if (existingUser) {
                            // User with same email or userName already exists
                            reject("User with the same email or userName already exists.");
                        } else {
                            // Generate unique ID and insert user
                            const uniqueId = generalFunctions.generateUniqueId();
                            user.id = uniqueId;
                            usersCollection.insertOne(user)
                                .then((result) => {
                                    resolve(result);
                                })
                                .catch((error) => {
                                    console.error("Error creating user: ", error);
                                    reject(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking for existing user: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error)
            });
    });
}


function login(user) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                usersCollection.findOne({ email: user.email, password: user.password })
                    .then((foundUser) => {
                        if (foundUser) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    })
                    .catch((error) => {
                        console.error("Error finding user: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function getUserById(idUser) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                usersCollection
                    .findOne({ id: idUser })
                    .then((user) => {
                        resolve(user);
                    })
                    .catch((error) => {
                        console.error("Error getting user: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function followUser(idFollower, idFollowed) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const updateFollower = {
                    $push: { followed: idFollowed }
                };
                const updateFollowed = {
                    $push: { followers: idFollower }
                };
                Promise.all([
                    usersCollection.updateOne({ id: idFollower }, updateFollower),
                    usersCollection.updateOne({ id: idFollowed }, updateFollowed)
                ])
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        console.error("Error updating users: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function getAssistants(assistants) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                usersCollection.find({ id: { $in: assistants } }).toArray()
                    .then((assistants) => {
                        resolve(assistants)
                    })
                    .catch((error) => {
                        console.error("Error finding assistants: ", error)
                        reject(error)
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error)
            });
    });
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    followUser,
    login,
    getAssistants
}