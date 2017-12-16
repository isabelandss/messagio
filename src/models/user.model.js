const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: { 
        type: String, 
        required: ["O nome é obrigatório."]
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Informe um endereço de e-mail válido'],
        unique: ['E-mail já existente'],
        required: ["O e-mail é obrigatório."]
    },
    password: {
        type: String,
        required: ["A senha é obrigatória."]
    }
})

module.exports = mongoose.model('User', User)