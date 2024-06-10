const UserModel = require("../Models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signUp = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        //to hash password
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(password, salt);
    
        //to add to Database
        const newUser = new userModel({name:name, email:email, password:hash});
        const newlyInsertedUser = await newUser.save();
        res.json({success:true, message:"User registration successful, Please Login", id: newlyInsertedUser._id});
    }
    catch(err){
        res.status(500).json({ success: false, message: error.message });
    }

    
}

const logIn = async (req, res) =>{
    const user = await UserModel.findOne({email: req.body.email});
    // console.log(user);

    //cheking if user peresent
    if(!user){
        res.json({
            message:  'User not found, Please Sign Up'
        })
    }

    //To check If passsword matches 

   const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

   //to generate payload for jwt
   const payload = {
    userId: user._id,
    name: user.name
   }
    //to genearte signature for JWT
   const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
//    console.log(token)

   if(isPasswordValid){

    //Generate JWT after successful login

    return res.json({
        message:"Loggin Successful",
        token
    })
   }
   res.json({
    message:"Loggin Failure"
   })


}

const authController = {
    signUp,
    logIn
}

module.exports = authController;