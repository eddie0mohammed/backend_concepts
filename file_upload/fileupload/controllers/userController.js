
const multer = require('multer');

const User = require('../models/user');





//MULTER
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.body.email}-${Date.now()}.${ext}`);
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb('file format not supported', false);
    }
}

//multer config
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


//multer middleware : image => form data input name = "image"
const uploadPhoto = upload.single('image');

const uploadMiddleWare = (req, res, next) => {
    uploadPhoto(req, res, (err) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                error: err
            });
        }else{
            next();
        }
    })
}





const createUser = async (req, res, next) => {

    // console.log(req.file);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
        
        
    });

    if (req.file){
        user.imageUrl = req.file.filename
    }

    try{

        await user.save();
        res.status(200).json({
            status: 'success',
            user: user
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
    uploadMiddleWare: uploadMiddleWare,
    createUser: createUser,
}