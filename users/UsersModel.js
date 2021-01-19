const Sequelize = require('sequelize');
const connection = require('../database/database');

const Users = connection.define('users', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

// Users.sync({ force: true })

module.exports = Users;