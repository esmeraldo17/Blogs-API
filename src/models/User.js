module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING
      }
    }, {
      underscored: true,
      tableName: 'users',
      timestamps: false,
    });

    User.associate = ({ BlogPost }) => {
      User.hasMany(BlogPost, {
        foreignKey: 'user_id', as: 'blogPost'
      });
    };
  
    return User;
  }