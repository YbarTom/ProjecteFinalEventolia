const usersDB = require("./users.js")
const postsDB = require("./posts.js")
const eventsDB = require("./events.js")
const commentsDB = require("./comments.js")
const categoriesDB = require("./categories.js")

const predeterminedProfilePic = "data:image/jpeg;base64,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"

async function generateUser(num) {
    for (let i = 1; i <= num; i++) {
        var user = {}
        user.userName = "user" + i
        user.email = "user" + i + "@gmail.com"
        user.password = "password" + i
        user.followers = []
        user.followed = []
        user.posts = []
        user.events = []
        user.profilePic = predeterminedProfilePic
        user.privacity = false

        await usersDB.createUser(user)
    }
}

async function generatePosts() {
    var post = {}
    post.idUser = "zi0s21h26zlvm89j9d"
    await postsDB.createPost(post)
}

async function generateCategories(categorie) {
    categoriesDB.createCategorie(categorie)
}

const categorieConcerts = {
    title: "Concerts",
    subcategories: [
        "Pop",
        "Rock",
        "Hip-Hop",
        "R&B",
        "Country",
        "Electronic",
        "Classical",
        "Jazz",
        "Reggae",
        "Reggaeton",
        "Blues",
        "Soul",
        "Metal",
        "Trap",
        "Funk",
        "Indie",
        "Latin",
        "Folk",
        "K-Pop",
        "Gospel",
        "Disco",
        "Ska",
        "Punk",
        "EDM"
    ]
}

const categorieSports = {
    title: "Sports",
    subcategories: [
        "Football",
        "American football",
        "Basketball",
        "Cricket",
        "Tennis",
        "Baseball",
        "Golf",
        "Rugby",
        "Ice Hockey",
        "Boxing",
        "MMA",
        "Swimming",
        "Track and Field",
        "Cycling",
        "Volleyball",
        "Table tennis",
        "Badminton",
        "Gymnastics",
        "Skiing"
    ]
}

const categorieFestivals = {
    title: "Festivals",
    subcategories: [
        "Music",
        "Film",
        "Cultural",
        "Food",
        "Art",
        "Literary",
        "Religious",
        "Seasonal",
        "Carnivals",
        "Beer",
        "Wine",
        "Fashion",
        "Comedy",
        "Heritage",
        "Folk",
        "Dance",
        "Street",
        "Film and TV Awards",
        "Environmental",
        "Science and Technology",
        "Medieval"
    ]
}

generateCategories()