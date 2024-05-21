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
categoriesCollection = database.collection("Categories")

async function createCategorie(categorie) {
    try {
        await client.connect();
        const uniqueId = generalFunctions.generateUniqueId();
        categorie.id = uniqueId;
        await categoriesCollection.insertOne(categorie);
    } catch (error) {
        console.error("Error creating categorie: ", error);
        throw error;
    }
}

function getCategories() {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                categoriesCollection
                    .find()
                    .toArray()
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error getting categories: ", error)
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error("Error connecting to database: ", error)
                reject(error);
            });
    });
}

module.exports = {
    createCategorie,
    getCategories
}