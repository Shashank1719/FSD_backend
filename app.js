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
//
app.use(passport.initialize())

const userAuthAPIRouter = buildUserRouter()

app.use("/auth/user", userAuthAPIRouter)

app.listen(5000, function (req, res) {
    mongoose.connect("mongodb+srv://Deep2:1n7RJVCpFkeuz2rf@cluster0.p8idm.mongodb.net/fsddb?retryWrites=true&w=majority", {
    })
    console.log("Server started at http://localhost:5000")
})