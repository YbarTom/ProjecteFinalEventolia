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
const notificationsCollection = database.collection("Notifications")
const generalFunctions = require("./generalFunctions.js")

function createNotification(notification) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const uniqueId = generalFunctions.generateUniqueId();
                generalFunctions.checkDuplicateId(uniqueId, notificationsCollection)
                    .then((isDuplicate) => {
                        if (isDuplicate) {
                            const newUniqueId = generalFunctions.generateUniqueId();
                            notification.id = newUniqueId;
                        } else {
                            notification.id = uniqueId;
                        }
                        notificationsCollection.insertOne(notification)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((error) => {
                                console.error("Error creating notification: ", error);
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

function getNotificationsByIdUser(idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                notificationsCollection.find({ notificated: idUser }).toArray()
                    .then((notifications) => {
                        resolve(notifications);
                    })
                    .catch((error) => {
                        console.error("Error getting notifications: ", error);
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
    createNotification,
    getNotificationsByIdUser
}