const db = require("../db/queries")
const { body, validationResult, matchedData } = require("express-validator")

const validateData = [
    body('name').trim().notEmpty().isLength({ min: 1, max: 20}).withMessage('name must be a string between 1 and 20 chars long')
]

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories()
    res.render("categories", { categories } )
}

async function getCategoryById(req, res) {
    const id = req.params.id
    const category = await db.getCategoryById(id)
    res.render("categories", { categories: [category]})
}

async function showAddCategoryForm(req, res) {
    res.render("add-category-form")
}

async function addNewCategory(req, res) {
    const errors = validationResult(req)
    if( !errors.isEmpty()) { 
        console.log(errors)
        return res.render("add-category-form", { errors: errors.array(), values: req.body })
    }
    const data = matchedData(req)
    const newCategoryName = data.name
    await db.addCategory(newCategoryName)
    res.redirect("/category")
}

async function showUpdateCategoryForm(req, res) {
    const category = await db.getCategoryById(req.params.id)
    res.render("update-category-form", { category })
}

async function updateCategoryById(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) { 
        console.log(errors)
        return res.render("update-category-form", { 
            errors: errors.array(), 
            category: { ...req.body, id: req.params.id }
        })
    }
    const data = matchedData(req)
    const categoryId = req.params.id
    const categoryName = data.name
    await db.updateCategoryById(categoryId, categoryName)
    res.redirect("/category")
}

async function deleteCategoryById(req, res) {
    const categoryId = req.params.id
    await db.deleteCategoryById(categoryId)
    res.redirect("/category")
}

async function deleteAllCategories(req, res) {
    await db.deleteAllCategories()
    res.redirect("/category")
}

module.exports = {
    getAllCategories,
    getCategoryById,
    showAddCategoryForm,
    addNewCategory,
    showUpdateCategoryForm,
    updateCategoryById,
    deleteCategoryById,
    deleteAllCategories,
    validateData
}
