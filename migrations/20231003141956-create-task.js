'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        foreignKey:true,
        references:{
          model:'Users',
          key:'id',
          name:'UserId'
        }
      },
      task_name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      starting_date: {
        allowNull:false,
        type: Sequelize.STRING
      },
      ending_date: {
        allowNull:false,
        type: Sequelize.STRING
      },
      status: {
        allowNull:false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};