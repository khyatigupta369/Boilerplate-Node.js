const User = require('@model/userSchema')
const jwt = require('jsonwebtoken')
const withAdminUser = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            const user_id=await jwt.verify(req.token, process.env.JWT_SECRET).id;
            const user=await User.findOne({
                _id: user_id,
                type: 'admin'
            })
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }
            req.admin = user;
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "Unauthorized"
        });
    }


}
module.exports = withAdminUser