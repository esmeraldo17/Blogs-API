module.exports = (Sequelize, DataTypes) => {
    const BlogPosts = Sequelize.define(
      'BlogPost',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
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
        },
        updated: {
          type: DataTypes.DATE,
        },
      }, {
        underscored: true,
        tableName: 'blog_posts',
        timestamps: false,
      }
    )
    BlogPosts.associate = ({ User }) => {
      BlogPosts.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
    return BlogPosts
  }