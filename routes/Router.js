const express = require('express')
import{
    createUser,
    userLogin,
    userExistCheck,
    userVerify,
    userDelete,
    makeStreamer,
    showUserInfo,
    isVerified, 
    createCard,
    getCards,
    getCardsByStreamer,
    deleteCard,
    editCard,
    createTransaction,
    getStreamers,
    getUsers,
    getUserCards,
    useCard,
    getCardInQueue,
    editUser,
    showStreamerURL
}from  "../services/index.js";

export function buildUserRouter(){
    const router=express.Router();
    router.post("/addUsers",async(req,res)=>{
        try{
            console.log("addUsers");
            let token=await createUser(req.body);
            res.json(token);            
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }

    });
    router.post("/login",async(req,res)=>{
        try{
            console.log("login");
            let token=await userLogin(req.body);
            if(token.verify==false){
                res.status(210).json(token)
            }
            else{
                res.json(token);
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })
    router.post("/verify", async (req, res) => {
        try{
            console.log("verify");
            let token=await userVerify(req.body);
            res.json(token);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }) 
    router.delete("/:emailId", async (req, res) => {
        try{
            console.log("delete");
            const token = req.headers.authorization.split(' ')[1];
            let user = await userDelete(req.params.emailId, token)
            res.json(user)
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })

    router.get("/showUserInfo", async (req, res) => {
        try{
            const emailId = req.headers['user-info']
            const token = req.headers.authorization.split(' ')[1];
            console.log(token);
            console.log(emailId);
            let user = await showUserInfo(emailId, token)
            console.log(user)
            res.json(user)
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }    
    })
    router.get("/isVerified/:emailId", async (req, res) => {
        try{
            console.log("isVerified");
            const token = req.headers.authorization.split(' ')[1];
            let user = await isVerified(req.params.emailId, token)
            res.json(user)
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.get("/makeStreamer/:emailId", async (req, res) => {
        try{
            console.log("makeStreamer");
            const token = req.headers.authorization.split(' ')[1];
            let user = await makeStreamer(req.params.emailId, token)
            res.json(user)
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.post("/createCard",async(req,res)=>{
        try{
            console.log("createCard");
            const token = req.headers.authorization.split(' ')[1];
            const emailId = req.headers['user-info']
            console.log(emailId)
            let status=await createCard(req.body, emailId, token);
            res.json(status);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }        
    });
    router.get("/getCards",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            console.log("getCards");
            const cards=await getCards(token);
            res.json(cards);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.get("/getStreamerCards/:emailId",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            const cards=await getCardsByStreamer(req.params.emailId, token);
            res.json(cards);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }   
    })
    router.delete("/deleteCard/:cardId",async(req,res)=>{
        try{
            console.log("DeleteCard");
            const token = req.headers.authorization.split(' ')[1];
            let status=await deleteCard(req.params.cardId, token);
            res.json(status);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.post("/editCard/:id", async (req, res) => {
        try{
            const token = req.headers.authorization.split(' ')[1];
            let response = await editCard(req.params.id, req.body, token)
            res.json(response)
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.post("/createTransaction", async (req, res) => {
        try{
            const emailId = req.headers['user-info']
            const token = req.headers.authorization.split(' ')[1];
            let response = await createTransaction(req.body, emailId, token)
            res.json(response)
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })
    router.get("/getStreamers",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            let streamers=await getStreamers(token);
            res.json(streamers);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })
    router.get("/getUsers",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            let Users=await getUsers(token);
            res.json(Users);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }       
    })
    router.get("/getUserCards",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            const emailId = req.headers['user-info']
            let userCards=await getUserCards(emailId, token);
            res.json(userCards);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })
    router.post("/useCard",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            const emailId = req.headers['user-info']
            let status=await useCard(req.body, emailId, token);
            res.json(status);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })
    router.get("/queueCards/:emailId",async(req,res)=>{
        try{
            let cards=await getCardInQueue(req.params.emailId);
            res.send(cards);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.put("/editUser",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            const emailId = req.headers['user-info']
            let status=await editUser(emailId, req.body, token);
            res.json(status);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    });
    router.get("/showStreamerURL",async(req,res)=>{
        try{
            const token = req.headers.authorization.split(' ')[1];
            const emailId = req.headers['user-info']
            let response=await showStreamerURL(emailId, token);
            res.json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    })
    return router;
}
