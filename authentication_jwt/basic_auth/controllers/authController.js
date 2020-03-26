

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const createUser = async (req, res, next) => {

    
    //validate
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Username, email and password required'
        });
    }

    //check if user exists in DB
    try{
        const user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({
                status: 'fail',
                error: 'Email already exists in DB'
            });
        }

    }catch(err){
        console.log(err);
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try{

        await newUser.save();
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });


    }catch(err){
        console.log(err);
    }
} 




const login = async (req, res, next) => {

    //validate
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            status:'fail',
            error: 'Email and password required'
        });
    }

    //check if email is in DB
    try{

        const user = await User.findOne({email: email});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        //verify credentials
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //generate token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});

        //attach token to header
        res.header('auth-token', token);

        res.status(200).json({
            status: 'success',
            token: token,
            data: {
                user: user
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
    createUser: createUser,
    login: login
}
