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
                usersCollection
                    .insertOne(user)
                    .then((result) => {
                        resolve(result)
                    })
                    .catch((error) => {
                        console.error("Error adding user: ", error)
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error)
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

/*function followUser(idFollower, idFollowed) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                // Update the follower
                usersCollection.findOneAndUpdate(
                    { id: idFollower },
                    { $push: { followed: idFollowed } },
                    { returnOriginal: false }
                )
                    .then(() => {
                        // Update the followed
                        return usersCollection.findOneAndUpdate(
                            { id: idFollowed },
                            { $push: { followers: idFollower } },
                            { returnOriginal: false }
                        );
                    })
                    .then((updatedFollowedUser) => {
                        resolve(updatedFollowedUser);
                    })
                    .catch((error) => {
                        console.error("Error updating followed user: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}*/


module.exports = {
    getUsers,
    createUser,
    getUserById,
    followUser
}