const express = require("express")
const path = require("path")
const router = express.Router()
const articleController = require(path.join(__dirname,"controllers/article_crud"))

// Get all articles
router.get("/get-all-articles", articleController.getAllArticles);

// Get article by ID
router.get("/get-article-by-id/:id", articleController.getArticleById);

// Create a new article
router.post("/create-article", articleController.createArticle);

// Update an article by ID
router.put("/update-article-by-id/:id", articleController.updateArticle);

// Delete an article by ID
router.delete("/delete-article-by-id/:id", articleController.deleteArticle);

module.exports = router;
