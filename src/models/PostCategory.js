module.exports = (Sequelize, DataTypes) => {
    const PostCategory = Sequelize.define(
      'PostCategory',
      {
        postId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          allowNull: false,
        },
      },
      {
        underscored: true,
        timestamps: false,
        tableName: 'post_categories',
      },
    )
    PostCategory.associate = ({ BlogPost, Category }) => {
      BlogPost.belongsToMany(Category, {
        foreignKey: 'post_id',
        as: 'categories',
        through: PostCategory,
        otherKey: 'category_id',
      })
      Category.belongsToMany(BlogPost, {
        foreignKey: 'category_id',
        as: 'blogPost',
        through: PostCategory,
        otherKey: 'category_id',
      })
    }
    return PostCategory
  }