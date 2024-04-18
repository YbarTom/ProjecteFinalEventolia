function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function checkDuplicateId(id, collection) {
    console.log("check")
    return new Promise((resolve, reject) => {
        collection.findOne({ id: id })
            .then((result) => {
                resolve(result !== null);
            })
            .catch((error) => {
                console.error("Error checking for duplicate ID: ", error);
                reject(error);
            });
    });
}

module.exports = {
    checkDuplicateId,
    generateUniqueId
}