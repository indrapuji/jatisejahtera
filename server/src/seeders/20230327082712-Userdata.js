'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Indra Puji Novirwan',
          username: 'indrapuji',
          password: '123456',
          role: 'super-admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Meiske Olivia',
          username: 'meiskeolivia',
          password: '123456',
          role: 'super-admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Akbar Akma',
          username: 'akbarakma',
          password: '123456',
          role: 'admin',
          regional: 'kantor-pusat',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Malik Ibrahim',
          username: 'malikibrahim',
          password: '123456',
          role: 'admin',
          regional: 'jawa-tengah',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Raden Rahma',
          nip: 'QWE123',
          email: 'radenrahma@gmail.com',
          username: 'radenrahma',
          password: '123456',
          role: 'member',
          regional: 'kantor-pusat',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: true,
        },
        {
          name: 'Rahman Tihar',
          nip: 'QWE456',
          email: 'rahmantihar@gmail.com',
          username: 'rahmantihar',
          password: '123456',
          role: 'member',
          regional: 'jawa-tengah',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: true,
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
