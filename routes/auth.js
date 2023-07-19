const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/auth/validate-jwt');
const { getUsers } = require('../controllers/user');

const router = Router();

router.post('/', [
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
], login)

module.exports = router;