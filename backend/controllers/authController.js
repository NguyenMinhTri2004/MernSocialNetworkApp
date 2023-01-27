const Users = require('../Models/userModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { response } = require('express')

const authController = {
    
    register : async  (req, res) => {
        try {
            const {fullname , username , email , password , gender } = req.body

            console.log(req.body)

            console.log(username)


            let newUserName = username.toLowerCase().replace(/ /g, '')

            const usernameDuplicate = await Users.findOne({
                username : newUserName
            })

            if(usernameDuplicate) {
                 return res.status(400).json({msg : "Tk da ton tai"})
            }

            const useremailDuplicate = await Users.findOne({email})

            if(useremailDuplicate) {
                 return res.status(400).json({msg : "Email da ton tai"})
            }


            const passwordHash = await bcrypt.hash(password , 12)

            console.log(passwordHash)

            const newUser = new Users({
                fullname , 
                username : newUserName,
                email,
                password : passwordHash,
                gender 

            })

            console.log(newUser)

            const accessToken = createAccessToken({id : newUser._id})

            const refreshToken = createRefreshToken({id : newUser._id})

            console.log(refreshToken , accessToken) 


            res.cookie("refreshToken" , refreshToken , {
                httpOnly : true,
                path : "/api/refresh_token", 
                maxAge : 30*24*60*60*1000
            })

            res.json(

                {
                    msg : "Registed"
                }
            )

            await newUser.save()

        }catch(err) {
           return res.status(500).json({msg : err.message})
        }
    },

    login : async  (req, res) => {
        try {

            const {email , password} = req.body

            const userExits = await Users.findOne({email})
            .populate("followers following" , "avatar username fullname followers follwing")

            if(!userExits){
                return res.status(400).json({msg : "Email khong ton tai"})
            }

            console.log(password)

            console.log(userExits)

            console.log( "pass: ", userExits.password)

            const passwordMath = await bcrypt.compare(password, userExits.password)

            if(!passwordMath){
                return res.status(400).json({msg : "User or password does not match"})
            }

            const accessToken = createAccessToken({id : userExits._id})

            const refreshToken = createRefreshToken({id : userExits._id})

            res.cookie("refreshToken" , refreshToken , {
                httpOnly : true,
                path : "/api/refresh_token",  
                maxAge : 30*24*60*60*1000
            })


            res.json(

                {
                    accessToken,
                    user : userExits,
                    msg : "Logined"
                }
            )



        }catch(err) {
           return res.status(500).json({msg : err.message})
        }
    },


    logout : async  (req, res) => {
        try {
        
             res.clearCookie('refreshToken' , {  path : "/api/refresh_token"})
             res.json({msg : "Logout"})
           
        }catch(err) {
           return res.status(500).json({msg : err.message})
        }
    },


    generateAccessToken : async  (req, res) => {
        try {

            

            const refreshToken = req.cookies.refreshToken

            
            
            if(!refreshToken){
                 return res.status(500).json({msg : "Vui long dang nhap"})
            }

            jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET , async (err , result) => {

                if(err){
                    return res.status(500).json({msg : "Vui long dang nhap"})
                }

                const user = await Users.findById(result.id).select("-password")
                .populate("followers following" , "avatar username fullname followers follwing")

                if(!user){
                    return res.status(500).json({msg : "Tk ko ton tai"})
                }

                const accessToken = createAccessToken({id : result._id})

                res.json({
                    accessToken,
                    user
                })


            })

            // res.json(refreshToken)
            res.cookie("refreshToken" , refreshToken , {
                httpOnly : true,
                path : "/api/refresh_token",  
                maxAge : 30*24*60*60*1000
            })
            
        }catch(err) {
           return res.status(500).json({msg : err.message})
        }
    }
}


const createAccessToken =  (id) => {
   return jwt.sign(id , process.env.ACCESS_TOKEN_SECRET , {expiresIn: '1d'})
}

const createRefreshToken =  (id) => {
   return jwt.sign(id , process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}

module.exports = authController