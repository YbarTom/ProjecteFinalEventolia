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

const usersDB = require("./users.js")
const generalFunctions = require("./generalFunctions.js")

const database = client.db(DBname);
postsCollection = database.collection("Posts")

function getPosts() {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                postsCollection
                    .find()
                    .toArray()
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error getting posts: ", error)
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error);
            });
    });
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const uniqueId = generalFunctions.generateUniqueId();
                generalFunctions.checkDuplicateId(uniqueId, postsCollection)
                    .then((isDuplicate) => {
                        if (isDuplicate) {
                            const newUniqueId = generalFunctions.generateUniqueId();
                            post.id = newUniqueId;
                        } else {
                            post.id = uniqueId;
                            usersDB.addPost(post.id, post.idUser)
                        }
                        postsCollection.insertOne(post)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((error) => {
                                console.error("Error creating post: ", error);
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error checking for duplicate ID: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error)
            });
    });
}

function addComment(idComment, idPost) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                return postsCollection.findOneAndUpdate(
                    { id: idPost },
                    { $addToSet: { comments: idComment } },
                    { returnOriginal: false }
                );
            })
            .then((updatedPost) => {
                resolve(updatedPost);
            })
            .catch((error) => {
                console.error("Error connecting to database or updating document: ", error)
                reject(error)
            });
    });
}

function getPostsById(idPost) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                postsCollection
                    .findOne({ id: idPost })
                    .then((post) => {
                        resolve(post);
                    })
                    .catch((error) => {
                        console.error("Error getting post: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function likePost(idUser, idPost) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                postsCollection
                    .updateOne(
                        { id: idPost },
                        { $push: { likes: idUser } }
                    )
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        console.error("Error liking post: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function dislikePost(idUser, idPost) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                postsCollection
                    .updateOne(
                        { id: idPost },
                        { $pull: { likes: idUser } }
                    )
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        console.error("Error disliking post: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}


function getPostsByIdUser(idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                postsCollection.find({ idUser: idUser }).toArray()
                    .then((posts) => {
                        resolve(posts);
                    })
                    .catch((error) => {
                        console.error("Error getting posts: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function getPostsByIdUsers(arrayId) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                const promises = arrayId.map(id => {
                    return postsCollection.find({ idUser: id }).sort({ publicationDate: -1 }).limit(3).toArray();
                });
                Promise.all(promises)
                    .then((results) => {
                        const combinedPosts = [].concat(...results);
                        resolve(combinedPosts);
                    })
                    .catch((error) => {
                        console.error("Error getting posts: ", error);
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
        client.connect()
            .then(() => {
                postsCollection.updateMany({ idUser: idUser }, { $set: { userName: newUserName } })
                    .then((result) => {
                        resolve(result.modifiedCount + " events updated successfully");
                    })
                    .catch((error) => {
                        console.error("Error updating events: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function deletePost(idPost) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                postsCollection.deleteOne({ id: idPost })
                resolve()
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

module.exports = {
    likePost,
    getPosts,
    createPost,
    getPostsById,
    getPostsByIdUser,
    getPostsByIdUsers,
    dislikePost,
    addComment,
    editUserName,
    deletePost
}