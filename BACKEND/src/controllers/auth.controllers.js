const userModel = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blackListedTokens_Model = require('../models/blacklist.schema')

async function registerUser (req,res) {

    const { username , email , password } = req.body;

    if( !username || !email || !password ){
        return res.status(400).json({
            success: false,
            message: "Please Provide all the details mentioned"
        })
    }

    const userAlreadyExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(userAlreadyExists){
        return res.status(400).json({
            message: "Account already exists for this credentials"
        })
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password:hashedPwd
    })

    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username
    }, process.env.JWT_SECRET, { expiresIn:"1d" } )

    res.cookie("token", token);

    res.status(201).json({
        message:"New user created successfully",
        user:{
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })

}

async function loginUser (req,res)  {

    const {email, password} = req.body;

    const userExists = await userModel.findOne({email}); 

    if(!userExists){
        return res.status(400).json({
            message: "No such user exists, Please register"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
            id: userExists._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: 'Welcome back User'
    });

}

async function logoutUser (req,res) {

    const token = req.cookies.token

    if(token){
        await blackListedTokens_Model.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User Logged Out Successfully"
    })

}

async function getUser (req,res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser
}