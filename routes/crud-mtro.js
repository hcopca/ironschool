const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const crudMtro = require("../models/usuario")



router.get('/maestros-lista', (req, res, next) => {
    crudMtro.find()
        .then(mtros => {
            //console.log(mtros)
            res.render("maestros-lista", { mtros })
        }).catch(error => { next(error) })
});

//Crear maestro.
//ELLOS SE REGISTRAN

//Editar maestro
router.get('/maestros/:id/edit', (req, res, next) => { //duda si lleva maestros antes del edit

    const editarMaestro = req.params.id
    crudMtro.findById(editarMaestro)
        .then((editarMaestro) => {
            res.render("update-form-mtro.hbs", { editarMaestro })
                //console.log(editarMaestro)
        })
});

router.post('/maestros/:id/edit', (req, res, next) => { //duda si lleva maestros

    const { id } = req.params
    console.log(id)
    const { nombre, apellidoPat, apellidoMat, noControl, telefono, turno, curp } = req.body
    crudMtro.findByIdAndUpdate(id, { nombre, apellidoPat, apellidoMat, noControl, telefono, turno, curp }, { new: true })
        .then((maestroAct) => {
            res.redirect('/maestros-lista')
        })
        .catch(error => next(error))
});

//Eliminar maestros
router.post('/maestros/:id/delete', (req, res, next) => { //duda si lleva maestros

    const { id } = req.params
    crudMtro.findByIdAndDelete(id)
        .then(() => res.redirect('/maestros-lista'))
        .catch(error => next(error))

});



module.exports = router;