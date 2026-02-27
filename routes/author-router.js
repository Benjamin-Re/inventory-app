const { Router } = require("express")

const { getAllAuthors, getAuthorById, showAddAuthorForm, addNewAuthor, showUpdateAuthorForm, updateAuthorById, deleteAuthorById, deleteAllAuthors, validateData } = require("../controllers/author-controller")

const authorRouter = Router()

authorRouter.get("/", getAllAuthors)

authorRouter.get("/new", showAddAuthorForm)

authorRouter.post("/new", validateData, addNewAuthor)

authorRouter.get("/deleteAll", deleteAllAuthors)

authorRouter.get("/:id", getAuthorById)

authorRouter.get("/:id/update", showUpdateAuthorForm)

authorRouter.post("/:id/update", validateData, updateAuthorById)

authorRouter.get("/:id/delete", deleteAuthorById)


module.exports = authorRouter