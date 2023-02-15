module.exports = (Sequelize, DataTypes) => {
    const BlogPosts = Sequelize.define(
      'BlogPost',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          foreignKey: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.STRING,
        },
        userId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
        published: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        timestams: false,
        underscored: true,
        tableName: 'blog_posts',
      },
    )
    BlogPosts.associate = ({ User }) => {
      BlogPosts.belongsTo(User, {
        foreignKey: 'id',
      })
    }
    return BlogPosts
  }