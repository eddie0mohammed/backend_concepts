

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const sendMail = require('../middleware/sendMail');


//REGISTER
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



//LOGIN
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


//GET USER
const getUser = async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        });


    }catch(err){
        console.log(err);
        res.status(401).json({
            status: 'fail',
            error: err
        });

    }

}


//FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {

    try{
        //validate
        if (!req.body.email){
            return res.status(400).json({
                status: 'fail',
                error: 'Please provide a valid email'
            });
        }

        // 1. get user based on email
        const user = await User.findOne({email: req.body.email});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
            });
        }

        // 2. generate random token
        const passwordResetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(passwordResetToken).digest('hex');

        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + (10 * 60 * 1000);
        await user.save({validateBeforeSave: false});

        // 3. send email
        //password reset url
        const passwordResetURL = `${req.protocol}://${req.get('host')}/auth/resetPassword/${passwordResetToken}`;

        //message
        const message = `Click here to reset your password: ${passwordResetURL}`;

        await sendMail({
            email: 'test@test.com',
            subject: 'PASSWORD RESET EMAIL',
            message: message
        });

        res.status(200).json({
            status: 'success',
            message: 'Password reset email sent'
        });

        
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 'fail',
            error: err
        })
    }

}


const redirectToResetPassword = (req, res, next) => {

    const token = req.params.token;
    res.redirect(`http://localhost:3000/resetPassword/${token}`);
}


//RESET PASSWORD
const resetPassword = async (req, res, next) => {

    try{

        // 1.  get user based on token
        const token = req.params.token;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({passwordResetToken: hashedToken});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: "No user found"
            });
        }

        // 2. if token has not expired, and there is user, set the new password
        if (user.passwordResetExpires < Date.now()){
            return res.status(400).json({
                status: 'fail',
                error: 'Token expired'
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 3. update the password
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save({validateBeforeSave: false});

        res.status(201).json({
            status: 'success',
            message: 'Password successfully updated',
            // user: user
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
    login: login,
    getUser: getUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    redirectToResetPassword: redirectToResetPassword
}
