const pool = require("./pool")

// Author
async function getAllAuthors() {
    const { rows } = await pool.query("SELECT * FROM author;")
    return rows
}

async function getAuthorById(id) {
    const { rows } = await pool.query("SELECT * FROM author WHERE author.id = $1;", [id])
    return rows[0]
}

async function addAuthor(firstName, lastName) {
    await pool.query("INSERT INTO author (firstname, lastname) VALUES ($1, $2)", [firstName, lastName])
}

async function updateAuthorById(id, firstName, lastName) {
    await pool.query(" \
        UPDATE author \
        SET firstname = $1, lastname = $2 \
        WHERE id = $3;", [firstName, lastName, id])
}

async function deleteAuthorById(id) {
    await pool.query("UPDATE book SET author = NULL WHERE author = $1", [id])
    await pool.query("DELETE FROM author WHERE author.id = $1", [id])
}

async function deleteAllAuthors() {
    await pool.query("UPDATE book SET author = NULL;")
    await pool.query("DELETE FROM author;")
}

// Category
async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM category;")
    return rows
}

async function getCategoryById(id) {
    const { rows } = await pool.query("SELECT * FROM category WHERE category.id = $1;", [id])
    return rows[0]
}

async function addCategory(name) {
    await pool.query("INSERT INTO category (name) VALUES ($1)", [name])
}

async function updateCategoryById(categoryId, categoryName) {
    await pool.query(" \
        UPDATE category \
        SET name = $1 \
        WHERE id = $2;", [categoryName, categoryId])
}

async function deleteCategoryById(id) {
    await pool.query("DELETE FROM category WHERE category.id = $1", [id])
}

async function deleteAllCategories() {
    await pool.query("UPDATE book SET category = NULL;")
    await pool.query("DELETE FROM category;")
}

// Book
async function getAllBooks(sort) {
    const validSortColumns = ['title', 'price']
    const orderBy = validSortColumns.includes(sort) ? sort : 'id';
    const { rows } = await pool.query(`
        SELECT book.id, title, price, firstname, lastname, name, stock, year FROM book \
        LEFT JOIN author on book.author = author.id \
        LEFT JOIN category on book.category = category.id \
        ORDER BY ${orderBy} ASC;`)
    return rows
}

async function getBookById(id) {
    const { rows } = await pool.query(" \
        SELECT * FROM book \
        LEFT JOIN author on book.author = author.id \
        LEFT JOIN category on book.category = category.id \
        WHERE book.id = $1;", [id])
    const book = rows[0]
    return book
}

async function addBook(title, price, author, category, stock, year) {
    await pool.query("INSERT INTO book (title, price, author, category, stock, year) VALUES ($1, $2, $3, $4, $5, $6)", [title, price, author, category, stock, year])
}

async function updateBookById(book) {
    await pool.query(" \
        UPDATE book \
        SET title = $1, price = $2, author = $3, category = $4, stock = $5, year = $6 \
        WHERE id = $7;", [
        book.title,
        book.price,
        book.author,
        book.category,
        book.stock,
        book.year,
        book.id
    ])
}

async function deleteBookById(id) {
    console.log(`About to delete book with id ${id}`)
    await pool.query("DELETE FROM book WHERE book.id = $1", [id])
}

async function deleteAllBooks() {
    await pool.query("TRUNCATE TABLE book;")
}

module.exports = {
    getAllBooks,
    addBook,
    getBookById,
    updateBookById,
    deleteBookById,
    deleteAllBooks,
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    deleteAllCategories,
    getAllAuthors,
    getAuthorById,
    addAuthor,
    updateAuthorById,
    deleteAuthorById,
    deleteAllAuthors
}
