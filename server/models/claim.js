'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Claim.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Claim.init(
    {
      userId: DataTypes.INTEGER,
      kategori: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['claim-kematian', 'claim-manfaat', 'claim-kesehatan', 'claim-kacamata']],
            msg: 'Invalid Kategori',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['created', 'approve', 'reject']],
            msg: 'Invalid Status',
          },
        },
      },
      permohonan_ahli_waris: DataTypes.STRING,
      keterangan_meninggal_dunia_lurah: DataTypes.STRING,
      keterangan_meninggal_dunia_rumah_sakit: DataTypes.STRING,
      keterangan_kepolisian: DataTypes.STRING,
      fotokopi_kp: DataTypes.STRING,
      fotokopi_kk: DataTypes.STRING,
      fotokopi_sk_pengangkatan: DataTypes.STRING,
      fotokopi_sk_pensiun: DataTypes.STRING,
      foto_selfie: DataTypes.STRING,
      bukti_tf: DataTypes.STRING,
      permohonan_pensiunan: DataTypes.STRING,
      pernyataan_dari_pensiunan: DataTypes.STRING,
      surat_permohonan_bantuan_biaya: DataTypes.STRING,
      kuitansi_asli_rs: DataTypes.STRING,
      surat_keterangan_rs: DataTypes.STRING,
      fotokopi_ktp: DataTypes.STRING,
      all_in_one: DataTypes.STRING,
      pemohon: DataTypes.STRING,
      pesan: DataTypes.STRING,
      lampiran: DataTypes.STRING,
      created_date: DataTypes.DATE,
      updated_date: DataTypes.DATE,
      sla: DataTypes.INTEGER,
      nominal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Claim',
    },
  );
  return Claim;
};
