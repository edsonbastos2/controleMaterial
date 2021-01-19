const express = require('express');
const adminAuthe = require('../middlewares/adminAuthe');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UsersModel = require('./UsersModel');

router.get('/admin/users', adminAuthe, (req, res) => {
    UsersModel.findAll().then(users => {
        res.render('admin/user/index', { users })
    })
})

router.get('/admin/users/create', adminAuthe, (req, res) => {
    res.render('admin/user/create')
});

router.post('/admin/users/cad', adminAuthe, (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let password = req.body.password;

    UsersModel.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt)

            UsersModel.create({
                nome,
                email,
                password: hash
            }).then(() => {
                res.redirect('/admin/users')
            }).catch(error => {
                res.redirect('/')
            })
        } else {
            res.redirect('/admin/users/create')
        }
    })
})

router.get('/login', (req, res) => {
    res.render('admin/user/login')
})

router.post('/authenticate', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    UsersModel.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) {
            let correct = bcrypt.compareSync(password, user.password);
            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/employees')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/')
})

module.exports = router;