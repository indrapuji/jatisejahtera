const {Content} = require('../models');
const createErrors = require('http-errors');
const serverUrl = require('../helpers/serverUrl');

class ContentControllers {
  static createContent = async (req, res, next) => {
    try {
      const {title, subtitle, desc, category, status} = req.body;
      if (!category) {
        throw createErrors(400, 'Fill category');
      }
      let image_url = null;
      if (req.file) image_url = serverUrl + req.file.path;
      const option = {title, subtitle, desc, category, status, image_url};
      await Content.create(option);
      res.status(201).json({...option, msg: 'Content created'});
    } catch (error) {
      next(error);
    }
  };

  static updateContent = async (req, res, next) => {
    try {
      const {id} = req.params;
      const {title, subtitle, desc, category, status} = req.body;
      const contentValidate = Content.findOne({where: {id}});
      if (!contentValidate) throw createErrors(400, 'Content no found');
      const option = {title, subtitle, desc, category, status};
      await Content.update(option, {where: {id}});
      res.status(200, 'Content Updated');
    } catch (error) {
      next(error);
    }
  };

  static getAllContent = async (req, res, next) => {
    try {
      let {category, status} = req.query;
      let query = {
        where: {},
        order: [['id', 'DESC']],
      };
      if (category) {
        query.where.category = category;
      }
      if (status) {
        query.where.status = status;
      }
      const result = await Content.findAll(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getSingleContent = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await Content.findOne({where: {id}});
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static deleteContent = async (req, res, next) => {
    try {
      const {id} = req.params;
      await Content.destroy({where: {id}});
      res.status(200).json({msg: `Data Deleted`});
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ContentControllers;
