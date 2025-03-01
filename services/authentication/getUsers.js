export default function buildGetUsers(userDb, jwtController){
    return async function getUsers(token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.returnAllUsers();
            console.log(response)
            return {status:"success",users:response};
        }
        catch(err){
            console.error(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {status:"failure",error:err};
        }
    }
}