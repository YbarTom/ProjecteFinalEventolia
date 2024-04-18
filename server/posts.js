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
                postsCollection
                    .insertOne(post)
                    .then((result) => {
                        resolve(result)
                    })
                    .catch((error) => {
                        console.error("Error adding post: ", error)
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error)
            });
    });
}

function getPostById(idPost) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                usersCollection
                    .findOne({ id: idPost })
                    .then((user) => {
                        resolve(user);
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

module.exports = {
    likePost,
    getPosts,
    createPost,
    getPostById
}