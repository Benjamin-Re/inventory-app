const db = require("../db/queries")
const { body, validationResult, matchedData } = require("express-validator")

const validateData = [
    body("firstname").trim().notEmpty().isLength({min: 1, max: 20}).withMessage("firstname must be between 1 and 20 chars long"),
    body("lastname").trim().notEmpty().isLength({min: 1, max: 20}).withMessage("lastname must be between 1 and 20 chars long")
]

async function getAllAuthors(req, res) {
    const authors = await db.getAllAuthors()
    res.render("authors", { authors } )
}

async function getAuthorById(req, res) {
    const id = req.params.id
    const author = await db.getAuthorById(id)
    console.log(`found author ${author.firstname}`)
    res.render("authors", { authors: [author]})
}

async function showAddAuthorForm(req, res) {
    res.render("add-author-form")
}

async function addNewAuthor(req, res) {
    const errors = validationResult(req)
    if( !errors.isEmpty()) { 
        console.log(errors)
        return res.render("add-author-form", { errors: errors.array(), values: req.body })
    }
    const data = matchedData(req)
    const firstName = data.firstname
    const lastName = data.lastname
    await db.addAuthor(firstName, lastName)
    res.redirect("/author")
}

async function showUpdateAuthorForm(req, res) {
    const author = await db.getAuthorById(req.params.id)
    res.render("update-author-form", { author })
}

async function updateAuthorById(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) { 
        console.log(errors)
        return res.render("update-author-form", { 
            errors: errors.array(),
            author: { id: req.params.id, firstname: req.body.firstname, lastname: req.body.lastname }
        })
    }
    const data = matchedData(req)
    const id = req.params.id
    const firstName = data.firstname
    const lastName = data.lastname
    await db.updateAuthorById(id, firstName, lastName)
    res.redirect("/author")
}

async function deleteAuthorById(req, res) {
    const id = req.params.id
    await db.deleteAuthorById(id)
    res.redirect("/author")
}

async function deleteAllAuthors(req, res) {
    await db.deleteAllauthors()
    res.redirect("/author")
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    showAddAuthorForm,
    addNewAuthor,
    showUpdateAuthorForm,
    updateAuthorById,
    deleteAuthorById,
    deleteAllAuthors,
    validateData
}
