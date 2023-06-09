const { BlogPost,
        User,
        Category,
        PostCategory,
      } = require('../models');

const createPost = async (email, body) => {
    const { title, content, categoryIds } = body;

    if (categoryIds.length === 0) {
       return { type: 400, message: 'one or more "categoryIds" not found' };
    }

    const { id } = await User.findOne({ where: { email } });

    const existsAllCategories = await Promise.all(
      categoryIds.map(async (e) => Category.findByPk(e)),
    );

    if (existsAllCategories.some((e) => e === null)) {
      return { type: 400, message: 'one or more "categoryIds" not found' };
   }

    const post = await BlogPost.create({ title, content, userId: id });
    const createdPost = await BlogPost.findByPk(post.id);

    const category = categoryIds.map((e) => ({ postId: createdPost.id, categoryId: +e }));

    await Promise.all(category.map(async (e) => {
      await PostCategory.create(e);
     }));
 
    return { type: '', message: createdPost };
};

const getAll = async () => {
    const post = await BlogPost.findAll({
        include: [
            {
              model: User,
              as: 'user',
              attributes: { exclude: ['password'] },
            },
            {
              model: Category,
              as: 'categories',
              through: { attributes: [] },
            },
          ],
    });

    return { type: '', message: post };
};

const getById = async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    if (!post) return { type: 404, message: 'Post does not exist' };
    return { type: '', message: post };
};

const updatePost = async (idPost, email, body) => {
      const { title, content } = body;
      if (!title || !content) {
          return { type: 400, message: 'Some required fields are missing' };
      }
  
      const { id } = await User.findOne({ where: { email } });

      const post = await getById(idPost);

      if (post.message.userId !== id) {
        return { type: 401, message: 'Unauthorized user' };
      }

      await BlogPost.update(
        { title, content },
        {
          where: { id: idPost },
        },
      );
    
      const upatedPost = await getById(idPost);
    
      return { type: '', message: upatedPost.message };
    };

    const removePost = async (idPost, email) => {
      const { id } = await User.findOne({ where: { email } });

      const postToDelete = await BlogPost.findByPk(idPost);
      if (!postToDelete) return { type: 404, message: 'Post does not exist' };

      if (postToDelete.userId !== id) {
        return { type: 401, message: 'Unauthorized user' };
      }

      await BlogPost.destroy({
        where: { id: idPost },
      });
    
      return { type: '', message: '' };
    };

module.exports = {
    createPost,
    getAll,
    getById,
    updatePost,
    removePost,
};