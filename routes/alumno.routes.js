//IMPORTACIONES
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const Usuario = require('../models/usuario')
    //OTRA RUTA
const saltRounds = 10


router.get('/sign-up-alumno', (req, res, next) => {
    res.render('sign-up-alumno')
})

router.post('/sign-up-alumno', async(req, res, next) => {
    const { email, password, nombre, apellidoPat, apellidoMat, noControl, telefono, turno, curp } = req.body
    if (!email || !password || !nombre || !curp) {
        res.render('sign-up-alumno', { errorMessage: 'Los campos son obligatorios, por favor usa, nombre, curp, un usuario, email o contraseña correcta' });
        return;
    }
    const alumno = 'Alumno'
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.render('sign-up-alumno', { errorMessage: 'Contraseña necesita tener por lo menos 6 dígitos, un número, una letra mayúscula y minúscula' });
        return;
    }
    const regexDos = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    if (!regexDos.test(curp)) {
        res.render('sign-up-alumno', { errorMessage: 'Ingresa un curp válido' })
        return;
    }

    const genSaltResults = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, genSaltResults)
    console.log(genSaltResults)

    await Usuario.create({
        email: email,
        passwordHash: hashedPassword,
        nombre: nombre,
        apellidoPat,
        apellidoMat,
        noControl,
        telefono,
        turno,
        curp,
        rol: alumno

    }).catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.render('sign-up-alumno', { errorMessage: error.message });
        } else if (error.code === 11000) {
            res.render('sign-up-alumno', {
                errorMessage: 'El nombre de usuario y el correo electrónico deben ser únicos. Ya se utiliza el nombre de usuario o el correo electrónico.'
            });
        } else {
            next(error);
        }
    })
    res.redirect('/login')

})


router.get('/user-profile-alumno', (req, res) => {
    console.log(req.session.currentUser)
    res.render('user-profile-alumno', { userInSession: req.session.currentUser });
});


module.exports = router