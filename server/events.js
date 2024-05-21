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
                            usersDB.addEvent(event.id, event.idUser)
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

function deleteEvent(idEvent) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                eventsCollection.deleteOne({ id: idEvent })
                    .then((result) => {
                        resolve(result.deletedCount + " event deleted successfully");
                    })
                    .catch((error) => {
                        console.error("Error deleting event: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
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

function editUserName(idUser, newUserName) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                eventsCollection.updateMany({ idUser: idUser }, { $set: { organizer: newUserName } })
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

function getEventsByIdUsers(arrayId) {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                const promises = arrayId.map(id => {
                    return eventsCollection.find({ idUser: id }).sort({ publicationDate: -1 }).limit(3).toArray();
                });
                Promise.all(promises)
                    .then((results) => {
                        const combinedEvents = [].concat(...results);
                        resolve(combinedEvents);
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

function getEvents() {
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                eventsCollection.find().toArray()
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

function addAssist(idEvent, idUser) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                eventsCollection
                    .updateOne(
                        { id: idEvent },
                        { $push: { assistants: idUser } }
                    )
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        console.error("Error adding assistant: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function removeAssist(idEvent, idUser) {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                eventsCollection
                    .updateOne(
                        { id: idEvent },
                        { $pull: { assistants: idUser } }
                    )
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        console.error("Error removing assistant: ", error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error);
                reject(error);
            });
    });
}

function acceptEvent(idEvent){
    return new Promise((resolve, reject) => {
        client.connect()
            .then(() => {
                eventsCollection.updateOne({ id: idEvent }, { $set: { accepted:true } })
                    .then((result) => {
                        resolve(result.modifiedCount + " event updated successfully");
                    })
                    .catch((error) => {
                        console.error("Error updating event: ", error);
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
    getEventById,
    getEventsByIdUsers,
    getEvents,
    editUserName,
    addAssist,
    removeAssist,
    deleteEvent,
    acceptEvent
}