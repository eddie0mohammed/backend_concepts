
const Post = require('../models/post');


const createPost = async (req, res, next) => {

    const {title} = req.body;
    if (!title){
        return res.status(400).json({
            status: 'fail',
            error: 'Title is required'
        });
    }

    try{
        const newPost = new Post({
            title: req.body.title
        });

        await newPost.save();
        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        })
                
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


const getPosts = async (req, res, next) => {

    try{
        const posts = await Post.find();

        res.status(200).json({
            status: 'success',
            data: {
                posts: posts
            }
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


module.exports = {
    createPost: createPost,
    getPosts: getPosts,
}