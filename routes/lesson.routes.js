const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Leccion = require('../models/leccion.js')


router.get('/lecciones', (req, res, next) => {

    const user = req.session.currentUser

    if (user.rol === 'Maestro') {
        user.esma = true
    }
    console.log(user.esma)
    Leccion.find()
        .then(less => {
            console.log(less)
            res.render("lecciones/todas-lesson", { less, user })
        }).catch(error => { next(error) })

});

//Crear


router.get('/lecciones/create', (req, res, next) => {

    res.render('lecciones/lesson-create')
});
router.post('/lesson-create', (req, res, next) => {
    const nameLesson = req.body.nameLesson
    const aprendizajeE = req.body.aprendizajeE
    const contenido = req.body.contenido
    const gradoLeccion = req.body.gradoLeccion
    const materialDidactico = req.body.materialDidactico


    Leccion.create({

            nameLesson,
            aprendizajeE,
            contenido,
            gradoLeccion,
            materialDidactico

        }).then((lessonCreated) => {
            res.redirect('/lecciones')
        })
        .catch(error => {
            res.render('lecciones/lesson-create')
        })

})

//Editar lecciones

router.get('/lecciones/:id/lesson-update', (req, res, next) => {

    const actLesson = req.params.id
    Leccion.findById(actLesson)
        .then((actLesson) => {
            res.render("lecciones/lesson-update.hbs", { actLesson })
            console.log(actLesson)
        })
});

router.post('/lecciones/:id/lesson-update', (req, res, next) => {

    const { id } = req.params
    const { nameLesson, aprendizajeE, contenido, gradoLeccion, materialDidactico } = req.body
    Leccion.findByIdAndUpdate(id, { nameLesson, aprendizajeE, contenido, gradoLeccion, materialDidactico }, { new: true })
        .then((lessonUpdate) => {
            res.redirect('/lecciones')
        })
        .catch(error => next(error))
});


//Borrar lecciones

router.post('/lecciones/:id/delete', (req, res, next) => {

    const { id } = req.params
    Leccion.findByIdAndDelete(id)
        .then(() => res.redirect('/lecciones'))
        .catch(error => next(error))

});




module.exports = router