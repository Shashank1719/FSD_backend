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
    getCardInQueue
}from  "../services/index.js";

export function buildUserRouter(){
    const router=express.Router();
    router.post("/addUsers",async(req,res)=>{
        console.log("addUsers");
        let token=await createUser(req.body);
        res.json(token);
    });
    router.post("/login",async(req,res)=>{
        console.log("login");
        let token=await userLogin(req.body);
        if(token.verify==false){
            res.status(210).json(token)
        }
        else{
            res.json(token);
        }
    })
    router.post("/verify", async (req, res) => {
        console.log("verify");
        let user = await userVerify(req.body)
        res.json(user)
    })
    // Deleting user
    router.delete("/:emailId", async (req, res) => {
        console.log("delete");
        const token = req.headers.authorization.split(' ')[1];
        let user = await userDelete(req.params.emailId, token)
        res.json(user)
    })
    // Activating user

    // Adding item to wishlist
    router.get("/showUserInfo", async (req, res) => {
        const emailId = req.headers['user-info']
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        console.log(emailId);
        let user = await showUserInfo(emailId, token)
        console.log(user)
        res.json(user)
    })
    router.get("/isVerified/:emailId", async (req, res) => {
        console.log("isVerified");
        const token = req.headers.authorization.split(' ')[1];
        let user = await isVerified(req.params.emailId, token)
        res.json(user)
    });
    router.get("/makeStreamer/:emailId", async (req, res) => {
        console.log("makeStreamer");
        let user = await makeStreamer(req.params.emailId)
        res.json(user)
    });
    router.post("/createCard",async(req,res)=>{
        console.log("createCard");
        const emailId = req.headers['user-info']
        console.log(emailId)
        let status=await createCard(req.body, emailId);
        res.json(status);
    });
    router.get("/getCards",async(req,res)=>{
        console.log("getCards");
        const cards=await getCards();
        res.json(cards);
    });
    router.get("/getStreamerCards/:emailId",async(req,res)=>{
        // console.log("getCardsByStreamer");
        const cards=await getCardsByStreamer(req.params.emailId);
        res.json(cards);
    })
    router.delete("/deleteCard/:cardId",async(req,res)=>{
        console.log("DeleteCard");
        let status=await deleteCard(req.params.cardId);
        res.json(status);
    });
    router.post("/editCard/:id", async (req, res) => {
        let response = await editCard(req.params.id, req.body)
        res.json(response)
    });
    router.post("/createTransaction", async (req, res) => {
        const emailId = req.headers['user-info']
        let response = await createTransaction(req.body, emailId)
        res.json(response)
    })
    router.get("/getStreamers",async(req,res)=>{
        const token = req.headers.authorization.split(' ')[1];
        let streamers=await getStreamers(token);
        res.json(streamers);
    })
    router.get("/getUsers",async(req,res)=>{
        const token = req.headers.authorization.split(' ')[1];
        let Users=await getUsers(token);
        res.json(Users);
    })
    router.get("/getUserCards",async(req,res)=>{
        const emailId = req.headers['user-info']
        let userCards=await getUserCards(emailId);
        res.json(userCards);
    })
    router.post("/useCard",async(req,res)=>{
        const emailId = req.headers['user-info']
        let status=await useCard(req.body, emailId);
        res.json(status);
    })
    router.get("/queueCards/:emailId",async(req,res)=>{
        let cards=await getCardInQueue(req.params.emailId);
        res.send(cards);
    });
    return router;
}
