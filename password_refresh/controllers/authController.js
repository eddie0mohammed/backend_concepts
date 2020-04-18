
const jwt = require('jsonwebtoken');

let refreshTokenArr = [];

const generateAccessToken = (user) => {

    const accessToken = jwt.sign(user, 'JWT_SECRET', { expiresIn: '15s'});
    return accessToken;
}


const login = (req, res, next) => {
    
    const username = req.body.username;
    const user = {name: username};

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, "REFRESH_TOKEN_SECRET");
    refreshTokenArr.push(refreshToken);

    res.status(200).json({
        status: 'success',
        accessToken: accessToken,
        refreshToken: refreshToken,
    });


}

const refreshAccessToken = async (req, res, next) => {
    

    try{

    
        const refreshToken = req.body.refreshToken;
        if (!refreshTokenArr){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }else if (!refreshTokenArr.includes(refreshToken)){
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized'
            });
        }else{
            const verified = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");
            if (!verified){
                console.log(verified);
                return res.status(401).json({
                    status: 'fail',
                    error: 'Unauthorized',
                    // message: 'token invalid'
                });
            }
            console.log(verified);
            const accessToken = generateAccessToken({name: verified.name});
            
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

const logout = (req, res, next) => {
    refreshTokenArr = refreshTokenArr.filter(elem => elem !== req.body.refreshToken);
    
    res.status(200).json({
        status: 'success',
        message: 'successfully logged out',
        // message: 'refresh token removed'
    })
}   


module.exports = {
    login: login,
    refreshAccessToken: refreshAccessToken,
    logout: logout,
}