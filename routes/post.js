const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/user/validate-fields');
const { getPosts, createPost } = require('../controllers/post');
const { validateJWT } = require('../middlewares/auth/validate-jwt');

const router = Router();

router.get('/', validateJWT, getPosts);
router.post('/', [
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('message', 'el mensaje es obligatorio').not().isEmpty(),
    validateFields,
    validateJWT
], createPost);



module.exports = router;