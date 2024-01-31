const path = require("path")
const { Op} = require("sequelize")
const {Article} = require('../../../sequelize_config/models')
const {plainToInstance} = require('class-transformer')
const {validate } = require('class-validator')
const {ArticleDTO} = require('../../../compiled/article_serializer')

var getAllArticles = async () => {
    try {
        return await Article.findAll();
    } catch (error) {
        throw error;  
    }
};



const getArticleById = async (id) => {
     return await Article.findByPk(id);
};
const createArticle = async (data) => {
    const article_serializer = plainToInstance(ArticleDTO, data);
    const errors = await validate(article_serializer);
    if (errors.length > 0) {
        const firstError = errors[0];
        throw new Error(`\n - Property: ${firstError.property} \n - Constraints: ${JSON.stringify(firstError.constraints)}`);
      }

    return await Article.create(article_serializer);
  };


const updateArticle = async (id, updatedData) => {
        const article = await Article.findByPk(id);
        await article.update(updatedData);
        return article;
};

const deleteArticle = async (id) => {
        const article = await Article.findByPk(id);
        await article.destroy();
        return article;
};

const filterArticles = async (filters) => {
        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    { label: { [Op.iLike]: `%${filters}%` } },
                    { description: { [Op.iLike]: `%${filters}%` } },
                ],
            },
        });
        return articles;
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    filterArticles,
};
