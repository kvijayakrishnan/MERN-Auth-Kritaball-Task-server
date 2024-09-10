
const express = require('express')
const db = require('./db/db')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')
const cors = require('cors')


dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({origin:'*'}))
db()

app.use('/api', userRoute)




const PORT = process.env.PORT || 4500




app.listen(PORT, ()=>
    console.log(`Server is running on the ${PORT}`)
);




