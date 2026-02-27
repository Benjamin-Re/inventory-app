const db = require("../db/queries")

const { body, validationResult, matchedData } = require("express-validator")

const validateData = [
    body('title').trim().notEmpty().isLength({ min: 1, max: 40 }).withMessage("title length must be between 1 and 20"),
    body('price').isFloat({ min: 0, max: 100}).withMessage("price must be a float between 0 and 100"),
    body('stock').isInt({ min: 0 }).withMessage("stock must be a integer > 0"),
    body('author').isInt().custom(async (id) => {
        const author = await db.getAuthorById(id)
        if(!author) throw new Error("Author not found")
    }).withMessage("author must be integer referencing valid author id. Consult 'All Authors'"),
    body('category').isInt().custom(async (id) => {
        const category = await db.getCategoryById(id)
        if(!category) throw new Error("Category not found")
    }).withMessage("category must be integer referencing valid category id. Consult 'All Categories'"),
    body('year').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage("year must be integer between 1000 and current year"),
]

async function getAllBooks(req, res) {
    const books = await db.getAllBooks()
    res.render("books", { books } )
}

async function getBookById(req, res) {
    const book = await db.getBookById(req.params.id)
    res.render("books", { books: [book]} )
}

async function showAddBookForm(req, res) {
    res.render("add-book-form")
}

async function addBook(req, res) {
    const errors = validationResult(req)
    if( !errors.isEmpty()) { 
        console.log(errors)
        return res.render("add-book-form", { errors: errors.array(), values: req.body })
    }
    const data = matchedData(req)
    const title = data.title
    const price = data.price
    const author = data.author
    const category = data.category
    const stock = data.stock
    const year = data.year
    await db.addBook(title, price, author, category, stock, year)
    res.redirect("/book")
}

async function showUpdateBookForm(req, res) {
    const book = await db.getBookById(req.params.id)
    res.render("update-book-form", { book })
}

async function updateBookById(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) { 
        console.log(errors)
        return res.render("update-book-form", { 
            errors: errors.array(),
            book: { ...req.body, id: req.params.id }
        })
    }
    const data = matchedData(req)
    const book = data
    book.id = req.params.id
    console.log(book)
    await db.updateBookById(book)
    getAllBooks(req, res)
}

async function deleteBookById(req, res) {
    const id = req.params.id
    await db.deleteBookById(id)
    res.redirect("/book")
}

async function deleteAllBooks(req, res) {
    await db.deleteAllBooks()
    console.log("Deleted all books")
    res.redirect("/book")
}

module.exports = {
    getAllBooks,
    showAddBookForm,
    addBook,
    getBookById,
    showUpdateBookForm,
    updateBookById,
    deleteBookById,
    deleteAllBooks,
    validateData
}