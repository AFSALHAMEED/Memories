const express = require("express")

const app = express()

const bodyParser = require("body-parser")

const cors = require("cors")

const mongoose = require("mongoose")

const postRouter = require("./route/routes")
const userRouter = require("./route/users")


require("dotenv").config()

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use("/posts",postRouter)
app.use("/user",userRouter)



const PORT = process.env.Port || 5000

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log("connected successfully")))
.catch((error)=>console.log(error.message))

