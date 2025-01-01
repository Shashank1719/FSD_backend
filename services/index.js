import{
    userDb
}from "../controller/index.js";

import {buildCreateUser} from "./authentication/createUser.js";
import buildLogin from "./authentication/login.js";
import userExistingCheck from "./authentication/exists.js"
import buildVerifyUserInDb from "./authentication/verify.js";
import buildDeleteUserInDb from "./authentication/delete.js";
import buildShowUserInfo from "./authentication/showUserInfo.js";

export const createUser=buildCreateUser(userDb);
export const userLogin=buildLogin(userDb);
export const userExistCheck = userExistingCheck(userDb)
export const userVerify = buildVerifyUserInDb(userDb)
export const userDelete = buildDeleteUserInDb(userDb)
export const showUserInfo=buildShowUserInfo(userDb);
