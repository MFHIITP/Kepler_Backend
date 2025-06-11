import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '../index.js'

const checkAccessToken = async(req, res, next) => {
    try{
        const fullAccessToken = req.headers['authorizationaccesstoken'];
        const token = fullAccessToken.split(' ')[1];
        const decode = jwt.verify(token, JWT_ACCESS_SECRET);
        next();
    }
    catch(err){
        res.status(401).send("Access Token Expired");
    }
}
export default checkAccessToken