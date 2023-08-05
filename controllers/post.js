const { response } = require('express');

const Post = require('../models/post');

const getPosts = async(req, res) => {
    const since = Number(req.query.since) || 0;
    const [posts, total] = await Promise.all([
        Post.find()
        .sort('-date_at')
        .skip(since)
        .limit(3)
        .populate('user', 'name'),

        Post.count()

    ])


    res.json({
        ok: true,
        posts,
        total
    })
}


const getPostsById = async(req, res = response) => {
    const uid = req.params.id;
    const since = Number(req.query.since) || 0;

    try {

        const [posts, total] = await Promise.all([
            Post.find({ user: uid })
            .sort('-date_at')
            .skip(since)
            .limit(3),

            Post.count(),

        ])

        if (!posts) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe posts para este usuario'
            })
        }


        res.json({
            ok: true,
            posts,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
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
    getPostsById
}