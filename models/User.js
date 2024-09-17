const { Schema, model, models } = require('mongoose');

const UserSchema = Schema({
    user: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    unique_id: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', UserSchema);