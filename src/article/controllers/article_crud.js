const path = require("path");
const articleService = require("../../../src/article/services/article_service")
const responseWrapper = require("../../../core/helpers/responseWrapper")

const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    return res.json(
      responseWrapper(
        articles,
        "getAllArticles",
        "Articles retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "getAllArticles", "Internal Server Error", false)
      );
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await articleService.getArticleById(id);
    return res.json(
      responseWrapper(
        article,
        "getArticleById",
        "Article retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "getArticleById", "Internal Server Error", false)
      );
  }
};

const createArticle = async (req, res) => {
  try {
    const testData = {
      label: "Test Article",
      description: "This is a test article for validation.",
      images: "https://example.com/test-image.jpg",
      userId: 1,
    };
    const newArticle = articleService.createArticle(testData);
 
    return res
      .status(201)
      .json(
        responseWrapper(
          newArticle,
          "createArticle",
          "Article created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "createArticle", "Internal Server Error", false)
      );
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedArticle = await articleService.updateArticle(id, req.body);
    if (!updatedArticle) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "updateArticle", "Article not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedArticle,
        "updateArticle",
        "Article updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateArticle", "Internal Server Error", false)
      );
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await articleService.deleteArticle(id);
    if (!deletedArticle) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "deleteArticle", "Article not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedArticle,
        "deleteArticle",
        "Article deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteArticle", "Internal Server Error", false)
      );
  }
};

const filterArticles = async (req, res) => {
  const { search } = req.query;

  try {
    const filteredArticles = await articleService.filterArticles(search);
    return res.json(
      responseWrapper(
        filteredArticles,
        "filterArticles",
        "Articles filtered successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "filterArticles", "Internal Server Error", false)
      );
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  filterArticles,
};
