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
eventsCollection = database.collection("Events")

function createEvent(event) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                const uniqueId = generalFunctions.generateUniqueId();
                generalFunctions.checkDuplicateId(uniqueId, eventsCollection)
                    .then((isDuplicate) => {
                        if (isDuplicate) {
                            const newUniqueId = generalFunctions.generateUniqueId();
                            event.id = newUniqueId;
                        } else {
                            event.id = uniqueId;
                        }
                        eventsCollection.insertOne(event)
                            .then((result) => {
                                resolve(result);
                            })
                            .catch((error) => {
                                console.error("Error creating event: ", error);
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

function getEventsByIdUser(idUser) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                eventsCollection.find({ idUser: idUser }).toArray()
                    .then((events) => {
                        resolve(events);
                    })
                    .catch((error) => {
                        console.error("Error getting events: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function getEventById(idEvent) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                eventsCollection.findOne({ id: idEvent })
                    .then((event) => {
                        resolve(event);
                    })
                    .catch((error) => {
                        console.error("Error getting assistants from events: ", error);
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
    createEvent,
    getEventsByIdUser,
    getEventById
}