const express = require('express')
import{
    createUser,
    userLogin,
    userExistCheck,
    userVerify,
    userDelete,
    userActivation,
    showUserInfo,   
}from  "../services/index.js";

export function buildUserRouter(){
    const router=express.Router();
    router.post("/addUsers",async(req,res)=>{
        let token=await createUser(req.body);
        res.json(token);
    });
    router.post("/login",async(req,res)=>{
        let token=await userLogin(req.body);
        res.json(token);
    })
    // Getting user by username
    router.get("/:username", async (req, res) => {
        let user = await userExistCheck(req.params.username)
        console.log(user.user)
        res.json(user)
    })
    // Verifying user
    router.post("/verify/:username", async (req, res) => {
        let user = await userVerify(req.params.username)
        res.json(user)
    })
    // Deleting user
    router.delete("/:username", async (req, res) => {
        let user = await userDelete(req.params.username)
        res.json(user)
    })
    // Activating user

    // Adding item to wishlist
    router.get("/showUserInfo/:username", async (req, res) => {
        let user = await showUserInfo(req.params.username)
        res.json(user)
    })
    return router;
}
