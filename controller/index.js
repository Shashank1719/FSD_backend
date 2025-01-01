import mongoose from "mongoose"
import dotenv from 'dotenv'
import passportLocalMongoose from "passport-local-mongoose"
import jwt from "jsonwebtoken"
dotenv.config()

import buildUserDb from "./users"
import buildJwtController from "./jwtController"

const userSchema = new mongoose.Schema({
    username: String,
    emailId: String,
    dateOfBirth: Date,
    createdAt: Date,
    userType: String, 
    isVerified: Boolean,
})
userSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        IncorrectPasswordError: "password_incorrect",
        IncorrectUsernameError: "username_incorrect",
        MissingPasswordError: "password_empty",
        MissingUsernameError: "username_empty",
        UserExistsError: "username_duplicate",
        NoSaltValueStoredError: "username_incorrect",
    },
})
const User = new mongoose.model("users", userSchema)
export const userJwtController = buildJwtController(jwt, "process.env.JWT_SECRET")
export const userDb = buildUserDb(User, userJwtController)
