export default function buildShowStreamerURL(userDb, jwtController){
    return async function getStreamerURL(emailId, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.getStreamerURL({emailId:emailId});
            return {status:"success",url:"/auth/user/queueCards/"+response};
        }
        catch(err){
            console.error(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {status:"failure",error:err.message};
        }
    }
}