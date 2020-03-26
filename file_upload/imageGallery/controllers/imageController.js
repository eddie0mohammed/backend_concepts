

const Image = require('../models/image');

const uploadPhoto = require('../utils/uploadImage');


//multer middleware
const multerMiddleware = (req, res, next) => {
    uploadPhoto(req, res, (err) => {

        if (err){
            // console.log(err);
            return res.status(400).json({
                status: 'fail',
                error: err
            });

        }else{
            next();
        }
    })
}



const saveImage = async (req, res, next) => {


    const image = new Image({});

    if (req.file){
        image.imageUrl = req.file.filename;
    }

    try{

        await image.save();
        res.status(201).json({
            status: 'success',
            message: 'imageUrl saved in DB',
            file: req.file

        });

        
    }catch(err){
        console.log(err);
    }

}


const getImages = async (req, res, next) => {

    try{

        const images = await Image.find();
        res.status(200).json({
            status: 'success',
            data: {
                images: images
            }
        });

    }catch(err){
        console.log(err);
    }

    
    
}   


module.exports = {
    saveImage: saveImage,
    multerMiddleware,
    getImages
}