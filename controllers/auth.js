const { response, request } = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req = request, res = response) => {
    const { user, password } = req.body;

    try {
        let usuario = await User.findOne({ user: user });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Ya existe ese usuario'
            });
        }

        usuario = new User(req.body);

        //cifrar contrasena
        const cadenaAleatoria = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, cadenaAleatoria);

        await usuario.save();

        res.status(201).json({
            ok: true,
            user: usuario.user
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
        
    }
};

const loginUser = async (req = request, res = response) => {
    const { user, password } = req.body;

    try {
        const usuario = await User.findOne({ user: user });

        if (!usuario) {
            return res.status(400).json({ 
                ok: false,
                message: 'No existe ese usuario'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contrasena incorrecta'
            })
        }
        res.json({
            ok: true,
            user: usuario.user,
            id: usuario.unique_id
        }); 

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error en el servidor'
        });
    }
}

module.exports = {
    loginUser,
    createUser
}