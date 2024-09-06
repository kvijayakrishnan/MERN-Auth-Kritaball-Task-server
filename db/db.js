

const mongoose = require('mongoose')


const connectDb= async()=>{
    try{
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log('mongo db is connected successfully')

    } catch (error){ 
        console.log("mongo db is not connected")
    }
}


module.exports = connectDb;




