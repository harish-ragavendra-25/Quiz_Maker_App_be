const authorizeRole = (...allowedRoles) => {
    return(req,res,next) => {
        if(!allowedRoles.includes(req.user.roles)){
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    }
};

const roleMiddleware = (allowedRoles) => (req,res,next) => {
    if(!allowedRoles.includes(req.user.role)){
        return res.status(403).json({ message: "Access forbidden: Insufficient permissions"});
    }
    next();
};

module.exports = authorizeRole,roleMiddleware;