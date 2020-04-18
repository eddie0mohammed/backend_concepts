
const posts = require('../mockDB/posts');


const getAllPosts = (req, res, next) => {
    
    const user = req.user;
    // console.log(user);
    const filteredPost = posts.filter(elem => elem.username === req.user.name);

    res.status(200).json({
        status: 'success',
        data: {
            posts: filteredPost
        }
    });
} 


module.exports = {
    getAllPosts: getAllPosts,
}