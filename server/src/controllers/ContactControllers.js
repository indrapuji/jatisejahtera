const {Contact} = require('../models');
const createErrors = require('http-errors');

class ContactControllers {
  static addContact = async (req, res, next) => {
    try {
      const {nama, alamat, telp, email, pesan} = req.body;
      if (!nama || !alamat || !telp || !email || !pesan) {
        throw createErrors(400, 'Input all require field');
      }
      let option = {nama, alamat, telp, email, pesan, status: false};
      await Contact.create(option);
      res.status(201).json({msg: 'Message saved'});
    } catch (error) {
      next(error);
    }
  };

  static deleteContact = async (rewq, res, next) => {
    try {
      const {id} = req.params;
      await Contact.destroy({where: {id}});
      res.status(200).json({msg: `Message Deleted`});
    } catch (error) {
      next(error);
    }
  };

  static getContact = async (req, res, next) => {
    try {
      let {status} = req.query;
      let query = {
        where: {},
        order: [['id', 'ASC']],
      };
      if (status) {
        query.where.status = status;
      }
      const result = await Contact.findAll(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getSingleContact = async (req, res, next) => {
    try {
      let {id} = req.params;
      const result = await Contact.findOne({where: {id}});
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static readContact = async (req, res, next) => {
    try {
      let {id} = req.params;
      await Contact.update({status: true}, {where: {id}});
      res.status(200).json({msg: 'Message Read'});
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ContactControllers;
