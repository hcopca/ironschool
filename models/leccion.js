const { Schema, model } = require('mongoose')

const leccionSchema = new Schema({

        nameLesson: {
            type: String,
            required: [true, 'El nombre de la lección es requerido.'],
            trim: true
        },
        aprendizajeE: {
            type: String,
            trim: true,
            required: [true, 'El aprendizaje esperado es requerido.']
        },
        contenido: {
            type: String,
            trim: true,
        },

        gradoLeccion: {
            type: String,
            trim: true,
            required: [true, 'El grado en la lección es requerido.']
        },
        materialDidactico: {
            type: String,
            trim: true
        }
    },

    { timestamps: true })



module.exports = model('User', leccionSchema)