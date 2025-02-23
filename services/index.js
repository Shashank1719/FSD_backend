import{
    userDb,
    cardDb,
    transactionDb,
    userJwtController,
}from "../controller/index.js";

import {buildCreateUser} from "./authentication/createUser.js";
import buildLogin from "./authentication/login.js";
import userExistingCheck from "./authentication/exists.js"
import buildVerifyUserInDb from "./authentication/verify.js";
import buildDeleteUserInDb from "./authentication/delete.js";
import buildShowUserInfo from "./authentication/showUserInfo.js";
import buildIsVerified from "./authentication/isVerified.js";
import buildCreateCard from "./cards/addCard.js";
import buildGetCards from "./cards/getCards.js";
import buildGetCardsByStreamer from "./cards/getCardsByStreamer.js";
import buildDeleteCard from "./cards/deleteCard.js";
import buildEditCard from "./cards/editCard.js";
import buildCreateTransaction from "./transaction/addTransaction.js";
import buildMakeStreamer from "./authentication/makeStreamer.js";
import buildGetStreamers from "./authentication/getStreamers.js";
import buildGetUsers from "./authentication/getUsers.js";
import buildGetUserCards from "./transaction/getUserCards.js";
import buildUseCard from "./transaction/useCard.js";
import buildGetCardInQueue from "./transaction/getCardInQueue.js";
export const createUser=buildCreateUser(userDb);
export const userLogin=buildLogin(userDb, userJwtController);
export const userExistCheck = userExistingCheck(userDb,userJwtController);
export const userVerify = buildVerifyUserInDb(userDb, userJwtController);
export const userDelete = buildDeleteUserInDb(userDb, userJwtController);
export const showUserInfo=buildShowUserInfo(userDb, userJwtController);
export const isVerified=buildIsVerified(userDb, userJwtController);
export const createCard=buildCreateCard(cardDb);
export const getCards=buildGetCards(cardDb);
export const getCardsByStreamer=buildGetCardsByStreamer(cardDb);
export const deleteCard=buildDeleteCard(cardDb);
export const editCard=buildEditCard(cardDb);
export const createTransaction=buildCreateTransaction(transactionDb);
export const makeStreamer=buildMakeStreamer(userDb, userJwtController);
export const getStreamers=buildGetStreamers(userDb, userJwtController);
export const getUsers=buildGetUsers(userDb, userJwtController);
export const getUserCards=buildGetUserCards(transactionDb);
export const useCard=buildUseCard(transactionDb);
export const getCardInQueue=buildGetCardInQueue(transactionDb);