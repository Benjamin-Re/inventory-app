const { Router } = require("express")
const { getAllBooks, addBook, showAddBookForm, getBookById, showUpdateBookForm, updateBookById, deleteBookById, deleteAllBooks, validateData } = require("../controllers/book-controller")
const bookRouter = Router()

bookRouter.get("/", getAllBooks)

bookRouter.get("/new", showAddBookForm)

bookRouter.post("/new", validateData, addBook)

bookRouter.get("/deleteAll", deleteAllBooks)

bookRouter.get("/:id", getBookById)

bookRouter.get("/:id/update", showUpdateBookForm)

bookRouter.post("/:id/update", validateData, updateBookById)

bookRouter.get("/:id/delete", deleteBookById)


module.exports = bookRouter