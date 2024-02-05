const path = require("path")
const {Op} = require("sequelize")
const {Article,User,Reply} = require('../../../sequelize_config/models')
const {plainToInstance} = require('class-transformer')
const {validate} = require('class-validator')
const {ArticleDTO} = require('../../../compiled/article/serializers/article_serializer')

const get_articles_service = async () => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: User, 
      
        },
        {
          model: Reply, 
  
        },
      ],
    });

    // Manipulate the result as needed (if any additional processing is required)

    return articles;
  } catch (error) {
    throw error;
  }
};



const get_article_service = async (id) => {
    return await Article.findByPk(id,{
      include: [
        {
          model: User, 
      
        },
        {
          model: Reply, 
  
        },
      ],
    });
};


const create_article_service = async (data) => {
    try {
      const article_serializer = plainToInstance(ArticleDTO, data);
      const errors = await validate(article_serializer);
  
      if (errors.length > 0) {
        const firstError = errors[0];
        throw errors;
      }
  
      return await Article.create(article_serializer);
    } catch (error) {
      console.error("Error in createArticle:", error);
      throw error; 
    }
  };

const update_article_service = async (id, updatedData) => {
        const article = await Article.findByPk(id);
        await article.update(updatedData);
        return article;
};

const delete_article_service = async (id) => {
        const article = await Article.findByPk(id);
        await article.destroy();
        return article;
};

const filter_articles_service = async (filters) => {
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
const get_article_userid_service = async (userId) => {
  return await Article.findAll({
    where: { userId: userId },
});
};
module.exports = {
    get_articles_service,
    get_article_service,
    create_article_service,
    update_article_service,
    delete_article_service,
    filter_articles_service,
    get_article_userid_service
};
