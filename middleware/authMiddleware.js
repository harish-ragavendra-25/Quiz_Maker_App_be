const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    let token;
    const authHeader = req.headers['authorization'];

    if(authHeader && authHeader.startwith("Bearer")){
        token = authHeader.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({ message: "No token,Authorization Denied" });
    }

    try {
        const decoded = jwt.decode(token);
        if(!decoded){
            return res.status(400).json({ message: "Malformed token "});
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        console.log("decoded user",req.user);
    } catch (error) {
        if(error.name == 'TokenExpiredError'){
            return res.status(401).json({ message: "Token Expired,please log in again" });
        }
        else if(error.name == 'JsonWebTokenError'){
            return res.status(400).json({ message: "Invalid token" });
        }
        else if(error.name == 'NotBeforeError'){
            return res.staus(400).json({ message: "Token verification failed" });
        }
        return res.status(500).json({ message:"Token Verfication Failed"});
    }
};

module.exports = verifyToken;