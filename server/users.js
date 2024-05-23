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

async function createUser(user) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const query = {
                    $or: [
                        { email: user.email },
                        { userName: user.userName }
                    ]
                };
                usersCollection.findOne(query)
                    .then((existingUser) => {
                        if (existingUser) {
                            if (existingUser.email === user.email) {
                                reject("The email is already used");
                            } else if (existingUser.userName === user.userName) {
                                reject("The userName is already used");
                            } else {
                                reject("El email o userName ya está en uso.");
                            }
                        } else {
                            // Generar ID único e insertar usuario
                            const uniqueId = generalFunctions.generateUniqueId();
                            user.id = uniqueId;
                            usersCollection.insertOne(user)
                                .then((result) => {
                                    resolve(result);
                                })
                                .catch((error) => {
                                    console.error("Error creando el usuario: ", error);
                                    reject(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error("Error verificando el usuario existente: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error conectando a la base de datos: ", error);
                reject(error);
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

function getUserByName(userName) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                usersCollection
                    .findOne({ userName: userName })
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

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                usersCollection
                    .findOne({ email: email })
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

function unfollowUser(idFollower, idFollowed) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const updateFollower = {
                    $pull: { followed: idFollowed }
                };
                const updateFollowed = {
                    $pull: { followers: idFollower }
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

function editUserName(idUser, newUserName) {
    return new Promise((resolve, reject) => {
        usersCollection
            .updateOne({ id: idUser }, { $set: { userName: newUserName } })
            .then((result) => {
                resolve(result.modifiedCount + "UserName updated successfully");
            })
            .catch((error) => {
                console.error("Error updating UserName: ", error);
                reject(error);
            });
    });
}

function editPassword(idUser, newPassword) {
    return new Promise((resolve, reject) => {
        usersCollection
            .updateOne({ id: idUser }, { $set: { password: newPassword } })
            .then((result) => {
                if (result.modifiedCount > 0) {
                    resolve("Password updated successfully");
                } else {
                    reject("No matching document found for id: " + idUser);
                }
            })
            .catch((error) => {
                console.error("Error updating password: ", error);
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

function addPost(idPost, idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return usersCollection.findOneAndUpdate(
                    { id: idUser },
                    { $addToSet: { posts: idPost } },
                    { returnOriginal: false }
                );
            })
            .then((updatedUser) => {
                resolve(updatedUser);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}

function deletePost(idPost, idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return usersCollection.findOneAndUpdate(
                    { id: idUser },
                    { $pull: { posts: idPost } },
                    { returnOriginal: false }
                );
            })
            .then((updatedUser) => {
                resolve(updatedUser);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}

function addEvent(idEvent, idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return usersCollection.findOneAndUpdate(
                    { id: idUser },
                    { $addToSet: { events: idEvent } },
                    { returnOriginal: false }
                );
            })
            .then((updatedUser) => {
                resolve(updatedUser);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}

function addChat(idUser, idChat) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return usersCollection.findOneAndUpdate(
                    { id: idUser },
                    { $addToSet: { chats: idChat } },
                    { returnOriginal: false }
                );
            })
            .then((updatedUser) => {
                resolve(updatedUser);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}

function addAssist(idUser, idEvent) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return usersCollection.findOneAndUpdate(
                    { id: idUser },
                    { $addToSet: { assistedEvents: idEvent } },
                    { returnOriginal: false }
                );
            })
            .then((updatedUser) => {
                resolve(updatedUser);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}

function removeAssist(idUser, idEvent) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return usersCollection.findOneAndUpdate(
                    { id: idUser },
                    { $pull: { assistedEvents: idEvent } },
                    { returnOriginal: false }
                );
            })
            .then((updatedUser) => {
                resolve(updatedUser);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}


function getAssistedEvents(idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                console.log("getUserById", idUser)
                return usersCollection.findOne({ id: idUser })
            })
            .then((user) => {
                resolve(user.assistedEvents)
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
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
    getAssistants,
    addPost,
    addEvent,
    getUserByEmail,
    getUserByName,
    unfollowUser,
    editUserName,
    editPassword,
    addChat,
    addAssist,
    removeAssist,
    getAssistedEvents,
    deletePost
}