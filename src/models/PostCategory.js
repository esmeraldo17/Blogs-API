module.exports = (Sequelize, DataTypes) => {
    const PostCategory = Sequelize.define(
      'PostCategory',
      {
        postId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        underscored: true,
        timestamps: false,
        tableName: 'posts_categories',
      },
    )
    PostCategory.associate = ({ BlogPost, Category }) => {
      BlogPost.belongsToMany(Category, {
        foreignKey: 'postId',
        as: 'categories',
        through: PostCategory,
      })
      Category.belongsToMany(BlogPost, {
        foreignKey: 'categoryId',
        as: 'blogPost',
        through: PostCategory,
      })
    }
    return PostCategory
  }