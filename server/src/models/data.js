'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Data.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Data.init(
    {
      tgl_lahir: DataTypes.STRING,
      no_ktp: DataTypes.STRING,
      no_bpjs: DataTypes.STRING,
      nama_bank: DataTypes.STRING,
      no_rekening: DataTypes.STRING,
      satuan_kerja: DataTypes.STRING,
      cabang: DataTypes.STRING,
      golongan_pangkat: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      alamat: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kota: DataTypes.STRING,
      kodepos: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      nama_pasangan: DataTypes.STRING,
      tgl_lahir_pasangan: DataTypes.STRING,
      no_telp_pasangan: DataTypes.STRING,
      no_ktp_pasangan: DataTypes.STRING,
      no_bpjs_pasangan: DataTypes.STRING,
      nama_bank_pasangan: DataTypes.STRING,
      no_rekening_pasangan: DataTypes.STRING,
      nama_anak: DataTypes.STRING,
      tgl_lahir_anak: DataTypes.STRING,
      no_tlp_anak: DataTypes.STRING,
      no_ktp_anak: DataTypes.STRING,
      no_bpjs_anak: DataTypes.STRING,
      nama_bank_anak: DataTypes.STRING,
      no_rekening_anak: DataTypes.STRING,
      status_member: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Data',
    },
  );
  return Data;
};
