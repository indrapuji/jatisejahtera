'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Claims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      kategori: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      permohonan_ahli_waris: {
        type: Sequelize.STRING,
      },
      keterangan_meninggal_dunia_lurah: {
        type: Sequelize.STRING,
      },
      keterangan_meninggal_dunia_rumah_sakit: {
        type: Sequelize.STRING,
      },
      keterangan_kepolisian: {
        type: Sequelize.STRING,
      },
      fotokopi_kp: {
        type: Sequelize.STRING,
      },
      fotokopi_kk: {
        type: Sequelize.STRING,
      },
      fotokopi_sk_pengangkatan: {
        type: Sequelize.STRING,
      },
      fotokopi_sk_pensiun: {
        type: Sequelize.STRING,
      },
      foto_selfie: {
        type: Sequelize.STRING,
      },
      bukti_tf: {
        type: Sequelize.STRING,
      },
      permohonan_pensiunan: {
        type: Sequelize.STRING,
      },
      pernyataan_dari_pensiunan: {
        type: Sequelize.STRING,
      },
      surat_permohonan_bantuan_biaya: {
        type: Sequelize.STRING,
      },
      kuitansi_asli_rs: {
        type: Sequelize.STRING,
      },
      surat_keterangan_rs: {
        type: Sequelize.STRING,
      },
      fotokopi_ktp: {
        type: Sequelize.STRING,
      },
      all_in_one: {
        type: Sequelize.STRING,
      },
      pemohon: {
        type: Sequelize.STRING,
      },
      pesan: {
        type: Sequelize.STRING,
      },
      lampiran: {
        type: Sequelize.STRING,
      },
      created_date: {
        type: Sequelize.DATE,
      },
      updated_date: {
        type: Sequelize.DATE,
      },
      sla: {
        type: Sequelize.INTEGER,
      },
      nominal: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Claims');
  },
};
