

const multer = require('multer');

const Photo = require('../models/photo');



//MULTER
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname.split('.')[0]}.${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    //check ext
    const fileTypes = /jpeg|jpg|png|gif/;
    const ext = file.mimetype.split('/')[1];
    const checkExt = fileTypes.test(ext);

    //check both mimetype and ext
    if (file.mimetype.startsWith('image') && checkExt){
        cb(null, true);
    }else{
        const ERROR = {message: 'Format not supported. Please upload an image'};
        cb(ERROR, false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fileSize: 3000000} //max size: 3mb
});

const uploadPhoto = upload.single('image');

//multer middleware
const uploadPhotoMiddleware = (req, res, next) => {
    uploadPhoto(req, res, (err) => {

        if (err) {
            // console.log(err);
            return res.status(500).json({
                status: 'fail',
                
                error: err
            });
        }else{
            // console.log(req.file);
            next();
        }
    })
}





const saveToDB = async (req, res, next) => {

    const photo = new Photo({
        
    });

    if (req.file){
        photo.imageUrl = req.file.filename;
    }

    try{
        await photo.save();
        res.status(201).json({
            status: 'success',
            message: 'imageUrl saved in DB',
            file: req.file
        });

    }catch(err){
        console.log(err);
        
    }

}


module.exports = {
    uploadPhotoMiddleware: uploadPhotoMiddleware,
    saveToDB: saveToDB
}