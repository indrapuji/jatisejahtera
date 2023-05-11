'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Data, {foreignKey: 'userId'});
      User.hasMany(models.Claim, {foreignKey: 'userId'});
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Nama Harus Diisi',
          },
        },
      },
      nip: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Username Harus Diisi',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password Harus Diisi',
          },
        },
      },
      email: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['super-admin', 'admin', 'member']],
            msg: 'Invalid Role',
          },
        },
      },
      regional: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
