const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../Models/auth');

dotenv.config();

const validateUser = async (req, res, next)=>{
    const headers = req.headers;
//points to validate JWT
    //1. if jwt token not present
    //2. secret key validation
    //3. expiry time should not be passed
    //4. validate user id present in database
    
    //1.
    if(!headers.authorization){
        return res.status(401).json({
            message:"Unauthenticated user"
        })
    } 
    
    //2
    try{
        jwt.verify(headers.authorization, process.env.JWT_SECRET_KEY)
        
    }catch(err){
        return res.status(401).json({
            message:"Unauthenticated user"
        })
    }

    //3
    //Token expiration date

    //5

    const tokenData = jwt.decode(headers.authorization);
    
    const userId = tokenData.userId; //user id saved in token
    const user = await userModel.findById(userId) //with the token userId checking database for user
    // console.log(userId);
    // console.log(user);
    if(!user){
        return res.status(401).json({
            message:"Unauthenticated user"
        })
    }

    req.user = user;
    next();
};

module.exports = validateUser;