const { response } = require('express');

const Post = require('../models/post');
const { generateJWT } = require('../helpers/jwt');


const getPosts = async(req, res) => {

    const posts = await Post.find().populate('user', 'name');
    res.json({
        ok: true,
        posts
    })
}

const createPost = async(req, res = response) => {


    const post = new Post({
        user: req.uid,
        date_at: new Date(),
        ...req.body
    });

    try {

        //Save post
        const postSaved = await post.save();

        //Generate token with JWT
        //const token = await generateJWT(user.id)

        res.json({
            ok: true,
            post: postSaved,

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en los posts, revisar logs',
            uid: req.uid
        })
    }

}

module.exports = {
    getPosts,
    createPost,
}