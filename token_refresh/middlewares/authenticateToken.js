

const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {

    const token = req.header('auth-token');
    if (!token){
        return res.status(401).json({
            status: 'fail',
            error: 'Unauthorized'
        });
    }

    try{

    

        const verified = await jwt.verify(token, 'JWT_SECRET');
        if (!verified){
            console.log(verified);
            return res.status(401).json({
                status: 'fail',
                error: 'Unauthorized',
                // message: 'token invalid'
            });
        }
        req.user = verified
        next();
    
    
    }catch(err){
        console.log(err);
        res.status(401).json({
            status: "fail",
            error: err
        });
    }
    

}


module.exports = authenticateToken;