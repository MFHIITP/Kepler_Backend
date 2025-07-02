import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '../index.js'

const checkAccessToken = async(req, res, next) => {
    try{
        const fullAccessToken = req.headers['authorizationaccesstoken'];
        if(!fullAccessToken){
            return res.status(400).json({
                message: "Authorisation token missing",
            })
        }
        const token = fullAccessToken.split(' ')[1];
        const decode = jwt.verify(token, JWT_ACCESS_SECRET);
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send("Access Token Expired");
    }
}
export default checkAccessToken