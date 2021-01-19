const express = require('express');
const router = express.Router();
const adminAuthe = require('../middlewares/adminAuthe');
const Patrimonies = require('./patrimonyModel');
const Employee = require('../employee/employeeModel');


router.get('/admin/patrimonies', adminAuthe, (req, res) => {
    Patrimonies.findAll({
        include: [{ model: Employee }]
    }).then(patrimonios => {
        res.render('admin/patrimonies/index', { patrimonios });
    })
})
router.get('/admin/patrimonios', adminAuthe, (req, res) => {
    Employee.findAll().then(employees => {
        res.render('admin/patrimonies/patrimonios', { employees })
    })
});

router.post('/admin/patrimonios/save', adminAuthe, (req, res) => {
    let nome = req.body.nome;
    let modelo = req.body.modelo;
    let tombamento = req.body.tombamento;
    let quantidade = req.body.quantidade;
    let descricao = req.body.descricao;
    let employeeId = req.body.employeeId;

    if (nome != undefined && tombamento != undefined) {
        Patrimonies.create({
            nome,
            modelo,
            tombamento,
            quantidade,
            descricao,
            employeeId: employeeId
        }).then(() => {
            res.redirect('/admin/patrimonies')
        })
    }
})

router.post('/patrimonies/delete', adminAuthe, (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Patrimonies.destroy({
                where: {
                    id: id
                }
            }).then(() => res.redirect('/admin/patrimonies'))
        } else {
            res.redirect('/admin/patrimonios')
        }
    } else {
        res.redirect('/admin/patrimonios')
    }
});

router.get('/admin/patrimonies/edit/:id', adminAuthe, (req, res) => {
    let id = req.params.id;

    Patrimonies.findByPk(id).then(patrimonios => {
        if (patrimonios != undefined) {
            Employee.findAll().then(employees => {
                res.render('admin/patrimonies/edite', { employees, patrimonios })
            })
        } else {
            res.redirect('/admin/patrimonies')
        }
    }).catch(() => {
        res.redirect('/admin/patrimonies')
    })

});

router.post('/patrimonios/update', adminAuthe, (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let modelo = req.body.modelo;
    let tombamento = req.body.tombamento;
    let quantidade = req.body.quantidade;
    let descricao = req.body.descricao;
    let employee = req.body.employee;

    if (isNaN(id)) {
        res.redirect('/admin/patrimonies')
    }
    Patrimonies.update({ nome, modelo, tombamento, quantidade, descricao, employeeId: employee }, {
        where: { id: id }
    }).then(() => {
        res.redirect('/admin/patrimonies')
    }).catch(error => {
        res.redirect('/admin/patrimonies')
    })
})

// Rota de paginação 
router.get('/patrimonios/page/:num', (req, res) => {
    let page = req.params.num;
    let offset = 0;

    if (isNaN(page) || page == 1) {
        offset = 0
    } else {
        offset = Number(page) * 2;
    }
    Patrimonies.findAndCountAll({
        limit: 2,
        offset: offset,
        include: [{ model: Employee }],
        order: [['id', 'DESC']]
    }).then(patrimonies => {

        let next;

        if (offset + 2 >= patrimonies.count) {
            next = false;
        } else {
            next = true
        }

        let result = {
            next,
            patrimonies
        }

        Employee.findAll().then(employee => {
            res.render('admin/patrimonies/pages', { result, employee })
        })

    })
})

module.exports = router;