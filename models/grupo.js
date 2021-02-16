const { Schema, model } = require('mongoose')

const grupoSchema = new Schema({

    Grado: {
        type: String,
        required: [true, 'El grado es requerido']
    },
    Grupo: {
        type: String,
        required: [true, 'El grupo es requerido']
    }
}, { timestamps: true })



module.exports = model('Grupo', grupoSchema)