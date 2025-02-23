export default function buildShowUserInfo(userDb, jwtController){
    return async function showUserInfo(emailId, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.showUserInfo(emailId);
            return {status:"success",user:response};
        }
        catch(err){
            console.error(err);
            return {status:"failure",error:err.message};
        }
    }
}