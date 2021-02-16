const { Schema, model } = require('mongoose')

const usuarioSchema = new Schema({


    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor usa un email válido'],
        required: [true, 'El email es requerido']
    },
    passwordHash: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    rol: { type: String, enum: ['Alumno', 'Maestro', 'Director'] },

    nombre: {
        type: String,
        trim: true,
    },
    apellidoPat: {
        type: String,
        trim: true
    },

    apellidoMAt: {
        type: String,
        trim: true
    },
    noControl: {
        type: Number,
    },
    telefono: {
        type: Number
    },
    turno: {
        type: String
    },
    curp: {
        type: String
    }

}, { timestamps: true })



module.exports = model('Usuario', usuarioSchema)