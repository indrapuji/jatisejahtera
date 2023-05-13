const {User, Data, Claim} = require('../models');
const createErrors = require('http-errors');
const {generateToken} = require('../helpers/jwt');
const serverUrl = require('../helpers/serverUrl');
const {Op} = require('sequelize');

class UserControllers {
  static checkUser = async (req, res, next) => {
    try {
      const {nip} = req.body;
      if (!nip) throw createErrors(400, 'NIP require');

      const userValidation = await User.findOne({where: {nip}});
      if (!userValidation) throw createErrors(400, 'NIP not found');

      res.status(200).json({msg: 'User already exist'});
    } catch (error) {
      next(error);
    }
  };

  static userAdminRegister = async (req, res, next) => {
    try {
      const {name, username, password, role, regional} = req.body;
      if (!name || !username || !password || !role) {
        throw createErrors(400, 'Input all require field');
      }
      const userValidation = await User.findOne({where: {username}});

      if (userValidation) throw createErrors(400, 'Username already exist');

      let option = {name, username, password, role, regional};
      await User.create(option);
      res.status(201).json({
        name,
        username,
        password,
        role,
        regional,
        msg: 'Admin Created',
      });
    } catch (error) {
      next(error);
    }
  };

  static userStaffRegister = async (req, res, next) => {
    try {
      const {name, nip, email, username, password, role, regional} = req.body;
      if (!name || !nip || !email || !username || !password || !role) {
        throw createErrors(400, 'Input all require field');
      }
      const userValidation = await User.findOne({where: {username}});
      if (userValidation) throw createErrors(400, 'Username already exist');

      const nipValidation = await User.findOne({where: {nip}});
      if (nipValidation) throw createErrors(400, 'NIP already exist');

      let option = {name, nip, email, username, password, role, regional, status: false};
      if (req.UserData.role === 'admin') {
        option.regional = req.UserData.regional;
      }

      await User.create(option);
      res.status(201).json({
        name,
        nip,
        email,
        username,
        password,
        role,
        regional,
        msg: 'Member Created',
      });
    } catch (error) {
      next(error);
    }
  };
  static userRegister = async (req, res, next) => {
    try {
      const {name, nip, email, username, password, regional} = req.body;
      if (!name || !nip || !email || !username || !password || !role) {
        throw createErrors(400, 'Input all require field');
      }
      const userValidation = await User.findOne({where: {username}});
      if (userValidation) throw createErrors(400, 'Username already exist');

      const nipValidation = await User.findOne({where: {nip}});
      if (nipValidation) throw createErrors(400, 'NIP already exist');

      let option = {name, nip, email, username, password, role: 'member', regional, status: false};
      await User.create(option);
      res.status(201).json({
        name,
        nip,
        email,
        username,
        password,
        role,
        regional,
        msg: 'Member Created',
      });
    } catch (error) {
      next(error);
    }
  };

  static userLogin = async (req, res, next) => {
    try {
      const {username, password} = req.body;

      if (!username || !password) {
        throw createErrors(400, 'all field required');
      }
      const userValidation = await User.findOne({where: {username}});
      if (!userValidation) {
        throw createErrors(400, 'wrong username / password');
      }
      if (userValidation.password !== password) {
        throw createErrors(400, 'wrong username / password');
      }
      const accessToken = await generateToken({
        id: userValidation.id,
        role: userValidation.role,
        regional: userValidation.regional,
      });
      res.status(200).json({
        name: userValidation.name,
        accessToken: accessToken,
        role: userValidation.role,
        username: userValidation.username,
      });
    } catch (error) {
      next(error);
    }
  };

  static changePassword = async (req, res, next) => {
    try {
      const {id} = req.UserData;
      const {old_password, new_password} = req.body;
      const userValidation = await User.findOne({where: {id}});
      if (!userValidation) throw createErrors(400, 'User not found');
      if (userValidation.password !== old_password) {
        throw createErrors(400, 'Old Password Wrong');
      }
      await User.update({password: new_password}, {where: {id}});
      res.status(200).json({msg: 'Update password success'});
    } catch (error) {
      next(error);
    }
  };

  static resetPassword = async (req, res, next) => {
    try {
      const {id} = req.params;
      const userValidation = await User.findOne({where: {id}});
      if (!userValidation) throw createErrors(400, 'User not found');
      await User.update({password: 'Jatisejahtera!2023'}, {where: {id}});
      res.status(200).json({msg: 'Reset password success'});
    } catch (error) {
      next(error);
    }
  };

  static getAdmin = async (req, res, next) => {
    try {
      const {role, regional, id} = req.UserData;

      let query = {
        where: {},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['id', 'ASC']],
      };

      if (role === 'admin') {
        query.where.role = role;
        query.where.regional = regional;
      }

      if (role === 'super-admin') {
        query.where.role = {[Op.or]: ['admin', 'super-admin']};
      }
      const result = await User.findAll(query);
      const newResult = result.filter((x) => x.id !== id);
      res.status(200).json(newResult);
    } catch (error) {
      next(error);
    }
  };
  static getAdminId = async (req, res, next) => {
    try {
      const {id} = req.params;
      const userValidation = await User.findOne({where: {id}});
      if (!userValidation) throw createErrors(400, 'User not found');
      const result = await User.findOne({where: {id}});
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getAllUser = async (req, res, next) => {
    try {
      const {role, regional} = req.UserData;
      let query = {where: {role: 'member'}, order: [['id', 'ASC']]};
      if (role === 'admin') {
        query.where.regional = regional;
      }
      const result = await User.findAll(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static userDelete = async (req, res, next) => {
    try {
      const {id} = req.params;
      await User.destroy({where: {id}});
      await Data.destroy({where: {userId: id}});
      await Claim.destroy({where: {userId: id}});
      res.status(200).json({msg: 'All Data Deleted'});
    } catch (error) {
      next(error);
    }
  };

  static userProfile = async (req, res, next) => {
    try {
      const {id} = req.UserData;
      const userData = await User.findOne({
        where: {id},
        include: [
          {
            model: Data,
            required: false,
            attributes: {exclude: ['userId', 'createdAt', 'updatedAt']},
          },
          {
            model: Claim,
            required: false,
            attributes: {exclude: ['userId', 'createdAt', 'updatedAt']},
          },
        ],
      });
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserControllers;
