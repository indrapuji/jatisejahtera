'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Data',
      [
        {
          tgl_lahir: '1985-11-10',
          no_ktp: '3275111011850003',
          no_bpjs: '123456789',
          nama_bank: 'Mandiri',
          no_rekening: '8415093230',
          satuan_kerja: 'kantor-pusat',
          cabang: 'pusat',
          golongan_pangkat: 'IV',
          no_telp: '081996946467',
          alamat: 'jln Puyuh VII, blok F no 241, Pondok Timur Indah',
          kelurahan: 'Mustika Jaya',
          kecamatan: 'Mustika Jaya',
          kota: 'Bekasi',
          kodepos: '17158',
          provinsi: 'Jawa Barat',
          nama_pasangan: 'Meiske',
          tgl_lahir_pasangan: '1985-06-11',
          no_telp_pasangan: '08123456789',
          no_ktp_pasangan: '123456789',
          no_bpjs_pasangan: '123456789',
          nama_bank_pasangan: 'BCA',
          no_rekening_pasangan: '841234567',
          nama_anak: 'Yuna',
          tgl_lahir_anak: '2023-06-11',
          no_tlp_anak: '08123456789',
          no_ktp_anak: '123456789',
          no_bpjs_anak: '123456789',
          nama_bank_anak: 'BCA',
          no_rekening_anak: '841234567',
          userId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tgl_lahir: '1985-11-10',
          no_ktp: '3275111011850003',
          no_bpjs: '123456789',
          nama_bank: 'Mandiri',
          no_rekening: '8415093230',
          satuan_kerja: 'jawa-tengah',
          cabang: 'semarang',
          golongan_pangkat: 'IV',
          no_telp: '081996946467',
          alamat: 'jln Puyuh VII, blok F no 241, Pondok Timur Indah',
          kelurahan: 'Mustika Jaya',
          kecamatan: 'Mustika Jaya',
          kota: 'Bekasi',
          kodepos: '17158',
          provinsi: 'Jawa Barat',
          nama_pasangan: 'Meiske',
          tgl_lahir_pasangan: '1985-06-11',
          no_telp_pasangan: '08123456789',
          no_ktp_pasangan: '123456789',
          no_bpjs_pasangan: '123456789',
          nama_bank_pasangan: 'BCA',
          no_rekening_pasangan: '841234567',
          nama_anak: 'Yuna',
          tgl_lahir_anak: '2023-06-11',
          no_tlp_anak: '08123456789',
          no_ktp_anak: '123456789',
          no_bpjs_anak: '123456789',
          nama_bank_anak: 'BCA',
          no_rekening_anak: '841234567',
          userId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
