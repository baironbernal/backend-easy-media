const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;


    try {
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //verify password
        const validPassword = bcrypt.compareSync(password, userExist.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }
        //Generate token with JWT
        const token = await generateJWT(userExist.id)

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el loggeo'
        })
    }

}



module.exports = {
    login
}