const Sequelize = require('sequelize');
const connection = require('../database/database');

const employeeModel = connection.define('employee', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    funcao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    posto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    setor: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//employeeModel.sync({ force: true });

module.exports = employeeModel;