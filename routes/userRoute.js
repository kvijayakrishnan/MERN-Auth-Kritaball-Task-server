const express = require('express')
const User = require('../model/UserModel')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
dotenv.config()

function signupTodken(email){
    const token = jwt.sign(email, process.env.signup_secret_token)
    return token
}




router.post('/register', async(req, res)=>{
    try {
        const {userName, fatherName, motherName, address, phoneNumer, email, password} = req.body
        if(!userName){
            res.status(400).send({msg:"Please fill the user name"})
        }
        if(!email){
            res.status(400).send({msg:"Please fill the user name"})
        }
        if(!password){
            res.status(400).send({msg:"Please fill the user name"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            console.log(existingUser)
            res.status(200).send({msg:'User already exists, Please Login'})
        }else{
            const hashPassword = await bcrypt.hash(password, 5)
            const token = signupTodken(email)
            const postUser = await new User({
                userName,
                fatherName,
                motherName,
                address,
                phoneNumer,
                email,
                password:hashPassword,
                token
            }).save();

            res.status(201).send({msg:'User register successfully'})
            console.log(postUser)
        }

        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'Internal server error'})
    }
})


router.post('/login', async(req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(404).send({msg:"Invalid credentials"})
        }
        const checkUser =  await User.findOne({email})
        if(!checkUser){
            return res.status(400).send({msg:"User is not found please register"})
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if(!checkPassword){
            res.status(400).send({msg:"Invalid credentials"})
        }
        const token = jwt.sign({_id:checkUser._id},process.env.login_secret_token,{expiresIn:'24h'})


        return res.status(200).send({msg:'Login successfully', checkUser:{
            _id:checkUser._id,
            userName:checkUser.userName,
            email:checkUser.email,
        },
        token
    })
        
    } catch (error) {
        res.status(500).send({msg:'Internal server error'})
        console.log(error)
    }
})




router.put('/update/:id', async(req, res) =>{
    try {
        const userUpdate =  req.params.id
        // console.log(userUpdate)

        await User.findByIdAndUpdate(userUpdate, req.body, {new:true})
        res.status(200).send({msg:'update successfully', userUpdate})
            
    } catch (error) {
        res.status(500).send({msg:'Internal server error'})
        console.log(error)
    }
})




router.get('/logout', async(req, res) =>{
    try {
        await res.clearCookie('accesstoken')
        res.status(500).send({msg:'Logout successfully'})
    } catch (error) {
        res.status(500).send({msg:'Internal server error'})
    }
})




router.get('/profile/:id', async(req, res) =>{
    try {
       const userProfile = req.params.id;
        console.log(userProfile)

        let myProfile = await User.findOne({userProfile:userProfile.userName})
        res.status(200).send({msg:"User profile", myProfile})
        console.log(myProfile)
        
    } catch (error) {
        res.status(500).send({msg:"Internal server error"})
        console.log(error)
    }


})










module.exports = router






