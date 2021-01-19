const Sequelize = require('sequelize');
const connection = require('../database/database');
const Employee = require('../employee/employeeModel');

const patrimonyModel = connection.define('patrimony', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tombamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }

})

Employee.hasMany(patrimonyModel);
patrimonyModel.belongsTo(Employee);

// patrimonyModel.sync({ force: true })

module.exports = patrimonyModel;