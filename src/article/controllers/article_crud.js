const path = require("path");
const articleService = require("../../../src/article/services/article_service")
const responseWrapper = require("../../../core/helpers/responseWrapper")
const {ValidationError } = require('class-validator')

const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.get_articles_service();
    return res.json(
      responseWrapper(
        articles,
        "get_articles_service",
        "Articles retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_articles_service", "Internal Server Error", false)
      );
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await articleService.get_article_service(id);
    return res.json(
      responseWrapper(
        article,
        "get_article_service",
        "Article retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_article_service", "Internal Server Error", false)
      );
  }
};

const createArticle = async (req, res) => {
  try {
    const article_before_send=req.body
    console.log("article_before_send: \n "+article_before_send+"\n");
    const article = await articleService.create_article_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          article,
          "create_article_service",
          "article created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_article_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_article_service", "Internal Server Error", false)
    );
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedArticle = await articleService.update_article_service(id, req.body);
    if (!updatedArticle) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_article_service", "Article not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedArticle,
        "update_article_service",
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
    const deletedArticle = await articleService.delete_article_service(id);
    if (!deletedArticle) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_article_service", "Article not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedArticle,
        "delete_article_service",
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
    const filteredArticles = await articleService.filter_articles_service(search);
    return res.json(
      responseWrapper(
        filteredArticles,
        "filter_articles_service",
        "Articles filtered successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "filter_articles_service", "Internal Server Error", false)
      );
  }
};

const getArticlesByUserId = async (req, res) => {
  try {
      const userId = req.query.userId;
      const articles = await articleService.get_article_userid_service(userId);
      return res.status(200).json(
        responseWrapper(articles, "get_article_userid_service", "Article by user retreived successfully", true)
      );
  } catch (error) {
    res.status(400).json(
      responseWrapper(null, "get_article_userid_service", error, false)
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
  getArticlesByUserId
};
