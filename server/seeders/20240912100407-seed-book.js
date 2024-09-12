'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = require('../book.json').map(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    } );
    await queryInterface.bulkInsert('Books', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, { 
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
