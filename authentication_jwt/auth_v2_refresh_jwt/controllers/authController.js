
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const register = async (req, res, next) => {

    //validate
    const {username, email, password} = req.body;
    if (!email || !username || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Username, email and password required'
        });
    }

    try{

        const exist = await User.findOne({email: req.body.email});
        if (exist){
            return res.status(400).json({
                status: 'fail',
                error: 'Email exists in DB'
            });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email, 
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
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



const login = async (req, res, next) => {

    //validate
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Email and password required'
        });
    }

    try{

        const user = await User.findOne({email: req.body.email});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //check password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //generate token
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 20});
        const refreshToken = await jwt.sign({id: user._id}, "REFRESH_TOKEN_SECRET");
        //include token in header
        res.header('auth-token', token);
        res.header('refresh-token', refreshToken);


        //save refreshToken to user
        user.refreshToken = refreshToken;
        await user.save();


        res.status(200).json({
            status: 'success',
            token: token,
            refreshToken: refreshToken,
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


const getUsers = async (req, res, next) => {

    try{

        const users = await User.find();
        
        res.status(200).json({
            status: 'success',
            data: {
                users: users
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


const getUser = async (req, res, next) => {

    try{

        if (!req.user){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }
        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found'
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
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
} 


const refreshAccessToken = async (req, res, next) => {

    try{
        const refreshToken = req.body.refreshToken;
        if (!refreshToken){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized1'
            });
        }

        const user = await User.findOne({refreshToken: refreshToken});

        if (!user){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized2'
            });

        }else{
            const verified = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");
            if (!verified){
                console.log(verified);
                return res.status(401).json({
                    status: 'fail',
                    error: 'Unauthorized3',
                    // message: 'token invalid'
                });
            }
            console.log(verified);
            const accessToken = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 20});
            
            return res.status(200).json({
                status: 'success',
                accessToken: accessToken
            });
        }

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}


const logout = async (req, res, next) => {

    try{

        const user = await User.findOne({refreshToken: req.body.refreshToken});
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }

        user.refreshToken = '';
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'successfully logged out'
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
    register: register, 
    login: login,
    getUsers: getUsers,
    getUser: getUser,
    refreshAccessToken: refreshAccessToken,
    logout: logout,
}