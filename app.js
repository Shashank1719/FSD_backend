import dotenv from "dotenv"
const express = require("express")
const cors = require('cors')
import bodyParser from "body-parser"
import passport from "passport"
import mongoose from "mongoose"
const expressJwt = require('express-jwt');

//routers
import { buildUserRouter} from "./routes/Router.js"

dotenv.config()
const app = express()

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '100mb'
    })
)

app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.text({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }))
app.use(express.raw({ limit: '100mb' }))
app.use(passport.initialize())

const userAuthAPIRouter = buildUserRouter()

app.use("/auth/user", userAuthAPIRouter)

port = process.env.PORT || 5000
app.listen(port, function (req, res) {
    mongoose.connect(process.env.MONGO_URL, {
    })
    console.log(`Server started at port: ${port}`)
})