const {User, Data} = require('../models');
const createErrors = require('http-errors');

class DataControllers {
  static recordData = async (req, res, next) => {
    try {
      const {id} = req.UserData;
      const {
        tgl_lahir,
        no_ktp,
        no_bpjs,
        nama_bank,
        no_rekening,
        satuan_kerja,
        cabang,
        golongan_pangkat,
        no_telp,
        alamat,
        kelurahan,
        kecamatan,
        kota,
        kodepos,
        provinsi,
        nama_pasangan,
        tgl_lahir_pasangan,
        no_telp_pasangan,
        no_ktp_pasangan,
        no_bpjs_pasangan,
        nama_bank_pasangan,
        no_rekening_pasangan,
        nama_anak,
        tgl_lahir_anak,
        no_tlp_anak,
        no_ktp_anak,
        no_bpjs_anak,
        nama_bank_anak,
        no_rekening_anak,
      } = req.body;
      const userValidation = await User.findOne({where: {id}});
      if (!userValidation) throw createErrors(401, 'User not found!');
      if (userValidation.role === 'super-admin' || userValidation.role === 'admin') {
        throw createErrors(401, 'Admin cannot record data!');
      }
      const recordData = await Data.findOne({where: {userId: id}});
      if (recordData) throw createErrors(401, 'Data already exist!');

      let option = {
        tgl_lahir,
        no_ktp,
        no_bpjs,
        nama_bank,
        no_rekening,
        satuan_kerja,
        cabang,
        golongan_pangkat,
        no_telp,
        alamat,
        kelurahan,
        kecamatan,
        kota,
        kodepos,
        provinsi,
        nama_pasangan,
        tgl_lahir_pasangan,
        no_telp_pasangan,
        no_ktp_pasangan,
        no_bpjs_pasangan,
        nama_bank_pasangan,
        no_rekening_pasangan,
        nama_anak,
        tgl_lahir_anak,
        no_tlp_anak,
        no_ktp_anak,
        no_bpjs_anak,
        nama_bank_anak,
        no_rekening_anak,
        userId: id,
      };
      await Data.create(option);
      await User.update({status: true}, {where: {id}});
      res.status(201).json({msg: 'Data Recorded'});
    } catch (error) {
      next(error);
    }
  };
  static recordFromStaff = async (req, res, next) => {
    try {
      const {id} = req.params;
      const {
        tgl_lahir,
        no_ktp,
        no_bpjs,
        nama_bank,
        no_rekening,
        satuan_kerja,
        cabang,
        golongan_pangkat,
        no_telp,
        alamat,
        kelurahan,
        kecamatan,
        kota,
        kodepos,
        provinsi,
        nama_pasangan,
        tgl_lahir_pasangan,
        no_telp_pasangan,
        no_ktp_pasangan,
        no_bpjs_pasangan,
        nama_bank_pasangan,
        no_rekening_pasangan,
        nama_anak,
        tgl_lahir_anak,
        no_tlp_anak,
        no_ktp_anak,
        no_bpjs_anak,
        nama_bank_anak,
        no_rekening_anak,
      } = req.body;
      const userValidation = await User.findOne({where: {id}});
      if (!userValidation) throw createErrors(401, 'User not found!');
      if (userValidation.role === 'super-admin' || userValidation.role === 'admin') {
        throw createErrors(401, 'Admin cannot record data!');
      }
      const recordData = await Data.findOne({where: {userId: id}});
      if (recordData) throw createErrors(401, 'Data already exist!');

      let option = {
        tgl_lahir,
        no_ktp,
        no_bpjs,
        nama_bank,
        no_rekening,
        satuan_kerja,
        cabang,
        golongan_pangkat,
        no_telp,
        alamat,
        kelurahan,
        kecamatan,
        kota,
        kodepos,
        provinsi,
        nama_pasangan,
        tgl_lahir_pasangan,
        no_telp_pasangan,
        no_ktp_pasangan,
        no_bpjs_pasangan,
        nama_bank_pasangan,
        no_rekening_pasangan,
        nama_anak,
        tgl_lahir_anak,
        no_tlp_anak,
        no_ktp_anak,
        no_bpjs_anak,
        nama_bank_anak,
        no_rekening_anak,
        userId: id,
      };
      await Data.create(option);
      await User.update({status: true}, {where: {id}});
      res.status(201).json({msg: 'Data Recorded'});
    } catch (error) {
      next(error);
    }
  };

  static updateData = async (req, res, next) => {
    try {
      const {id} = req.UserData;
      const {
        tgl_lahir,
        no_ktp,
        no_bpjs,
        nama_bank,
        no_rekening,
        satuan_kerja,
        cabang,
        golongan_pangkat,
        no_telp,
        alamat,
        kelurahan,
        kecamatan,
        kota,
        kodepos,
        provinsi,
        nama_pasangan,
        tgl_lahir_pasangan,
        no_telp_pasangan,
        no_ktp_pasangan,
        no_bpjs_pasangan,
        nama_bank_pasangan,
        no_rekening_pasangan,
        nama_anak,
        tgl_lahir_anak,
        no_tlp_anak,
        no_ktp_anak,
        no_bpjs_anak,
        nama_bank_anak,
        no_rekening_anak,
      } = req.body;
      const userValidation = await User.findOne({where: {id}});
      if (!userValidation) throw createErrors(401, 'User not found!');
      if (userValidation.role === 'super-admin' || userValidation.role === 'admin') {
        throw createErrors(401, 'Admin cannot record data!');
      }
      let option = {
        tgl_lahir,
        no_ktp,
        no_bpjs,
        nama_bank,
        no_rekening,
        satuan_kerja,
        cabang,
        golongan_pangkat,
        no_telp,
        alamat,
        kelurahan,
        kecamatan,
        kota,
        kodepos,
        provinsi,
        nama_pasangan,
        tgl_lahir_pasangan,
        no_telp_pasangan,
        no_ktp_pasangan,
        no_bpjs_pasangan,
        nama_bank_pasangan,
        no_rekening_pasangan,
        nama_anak,
        tgl_lahir_anak,
        no_tlp_anak,
        no_ktp_anak,
        no_bpjs_anak,
        nama_bank_anak,
        no_rekening_anak,
      };
      await Data.update(option, {where: {id: req.params.id}});
      res.status(200).json({msg: 'Update data success'});
    } catch (error) {
      next(error);
    }
  };

  static getUserRecord = async (req, res, next) => {
    try {
      const {id} = req.UserData;
      const dataUser = await User.findOne({
        where: {id},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
          {
            model: Data,
            required: false,
            attributes: {exclude: ['userId', 'createdAt', 'updatedAt']},
          },
        ],
      });

      res.status(200).json(dataUser);
    } catch (error) {
      next(error);
    }
  };

  static getData = async (req, res, next) => {
    try {
      const {role, regional} = req.UserData;
      let query = {
        where: {role: 'member'},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
          {
            model: Data,
            required: false,
            attributes: {exclude: ['userId', 'createdAt', 'updatedAt']},
          },
        ],
        order: [['id', 'ASC']],
      };

      if (role === 'admin') {
        query.where.regional = regional;
      }

      const result = await User.findAll(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getSingleRecord = async (req, res, next) => {
    try {
      const {id} = req.params;
      const dataUser = await User.findOne({
        where: {id},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
          {
            model: Data,
            required: false,
            attributes: {exclude: ['userId', 'createdAt', 'updatedAt']},
          },
        ],
      });
      res.status(200).json({
        id: dataUser.id,
        name: dataUser.name,
        nip: dataUser.nip,
        username: dataUser.username,
        email: dataUser.email,
        role: dataUser.role,
        regional: dataUser.regional,
        record_id: dataUser.Datum.id,
        tgl_lahir: dataUser.Datum.tgl_lahir,
        no_ktp: dataUser.Datum.no_ktp,
        no_bpjs: dataUser.Datum.no_bpjs,
        nama_bank: dataUser.Datum.nama_bank,
        no_rekening: dataUser.Datum.no_rekening,
        satuan_kerja: dataUser.Datum.satuan_kerja,
        cabang: dataUser.Datum.cabang,
        golongan_pangkat: dataUser.Datum.golongan_pangkat,
        no_telp: dataUser.Datum.no_telp,
        alamat: dataUser.Datum.alamat,
        kelurahan: dataUser.Datum.kelurahan,
        kecamatan: dataUser.Datum.kecamatan,
        kota: dataUser.Datum.kota,
        kodepos: dataUser.Datum.kodepos,
        provinsi: dataUser.Datum.provinsi,
        nama_pasangan: dataUser.Datum.nama_pasangan,
        tgl_lahir_pasangan: dataUser.Datum.tgl_lahir_pasangan,
        no_telp_pasangan: dataUser.Datum.no_telp_pasangan,
        no_ktp_pasangan: dataUser.Datum.no_ktp_pasangan,
        no_bpjs_pasangan: dataUser.Datum.no_bpjs_pasangan,
        nama_bank_pasangan: dataUser.Datum.nama_bank_pasangan,
        no_rekening_pasangan: dataUser.Datum.no_rekening_pasangan,
        nama_anak: dataUser.Datum.nama_anak,
        tgl_lahir_anak: dataUser.Datum.tgl_lahir_anak,
        no_tlp_anak: dataUser.Datum.no_tlp_anak,
        no_ktp_anak: dataUser.Datum.no_ktp_anak,
        no_bpjs_anak: dataUser.Datum.no_bpjs_anak,
        nama_bank_anak: dataUser.Datum.nama_bank_anak,
        no_rekening_anak: dataUser.Datum.no_rekening_anak,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = DataControllers;
