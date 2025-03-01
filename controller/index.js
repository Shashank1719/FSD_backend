import mongoose from "mongoose"
import dotenv from 'dotenv'
import passportLocalMongoose from "passport-local-mongoose"
import jwt from "jsonwebtoken"
dotenv.config()

import buildUserDb from "./users"
import buildJwtController from "./jwtController"
import buildCardDb from "./cards"
import buildTransactionDb from "./transactions"

const userSchema = new mongoose.Schema({
    username: String,
    emailId: String,
    dateOfBirth: Date,
    createdAt: Date,
    user_type: String, 
    isVerified: Boolean,
    youtubeLink: String,
    instagramLink: String,
    description: String,
    userName: String,
})
userSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        IncorrectPasswordError: "password_incorrect",
        IncorrectUsernameError: "username_incorrect",
        MissingPasswordError: "password_empty",
        MissingUsernameError: "username_empty",
        UserExistsError: "username_duplicate",
        EmailExistsError: "emailId_duplicate",
        NoSaltValueStoredError: "username_incorrect",
    },
})
const User = new mongoose.model("users", userSchema)
export const userJwtController = buildJwtController(jwt)
export const userDb = buildUserDb(User, userJwtController)

const cardSchema = new mongoose.Schema({
    cardTitle: String,
    description: String,
    imageUrl: String,
    category: Array,
    rarity: String,
    price: String,
    global: String,
    streamerEmailId: String,
    userEmailId: String,
})

const Card = new mongoose.model("cards", cardSchema)
export const cardDb = buildCardDb(Card)

const transactionSchema = new mongoose.Schema({
    cardId:String,
    streamerEmailId:String,
    userEmailId:String,
    isUsed:Boolean,
    purchaseDate:Date,
    title:String,
    description:String
})

const Transaction = new mongoose.model("transactions", transactionSchema)
export const transactionDb = buildTransactionDb(Transaction, Card, User)

