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
const postsDB = require("./posts.js")

const database = client.db(DBname);
commentsCollection = database.collection("Comments")

function createComment(comment) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const uniqueId = generalFunctions.generateUniqueId();
                generalFunctions.checkDuplicateId(uniqueId, commentsCollection)
                    .then((isDuplicate) => {
                        if (isDuplicate) {
                            const newUniqueId = generalFunctions.generateUniqueId();
                            comment.id = newUniqueId;
                        } else {
                            comment.id = uniqueId;
                            postsDB.addComment(comment.id, comment.idPost)
                        }
                        commentsCollection.insertOne(comment)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((error) => {
                                console.error("Error adding comment: ", error);
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error checking for duplicate ID: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function getCommentsByIdPost(idPost) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                commentsCollection.find({ idPost: idPost }).toArray()
                    .then((comments) => {
                        resolve(comments)
                    })
                    .catch((error) => {
                        console.error("Error getting comments: ", error)
                        reject(error)
                    })
            })
    })
}

module.exports = {
    createComment,
    getCommentsByIdPost
}