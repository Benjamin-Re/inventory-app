const { Router } = require("express")

const { getAllCategories, getCategoryById, showAddCategoryForm, addNewCategory, showUpdateCategoryForm, updateCategoryById, deleteCategoryById, deleteAllCategories, validateData } = require("../controllers/category-controller")

const categoryRouter = Router()

categoryRouter.get("/", getAllCategories)

categoryRouter.get("/new", showAddCategoryForm)

categoryRouter.post("/new", validateData, addNewCategory)

categoryRouter.get("/deleteAll", deleteAllCategories)

categoryRouter.get("/:id", getCategoryById)

categoryRouter.get("/:id/update", showUpdateCategoryForm)

categoryRouter.post("/:id/update", validateData, updateCategoryById)

categoryRouter.get("/:id/delete", deleteCategoryById)


module.exports = categoryRouter