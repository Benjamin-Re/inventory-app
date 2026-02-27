require('dotenv').config()

const express = require("express")
const app = express()
const path = require("node:path");



const bookRouter = require("./routes/book-router")
const categoryRouter = require("./routes/category-router")
const authorRouter = require("./routes/author-router")

app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/book", bookRouter)
app.use("/category", categoryRouter)
app.use("/author", authorRouter)

app.get("/", (req, res) => {
    res.render("main")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, (error) => {
    if(error) {
        throw error
    }
    console.log(`Express server running on port ${PORT}`)
})