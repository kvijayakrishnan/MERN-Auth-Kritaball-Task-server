const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    fatherName:{
        type:String,
        require:true
    },
    motherName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    token:{
        type:String,
        
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User

