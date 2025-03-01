export default function buildEditUser(userDb, jwtController){
    return async function editUser(emailId, newUser, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.editUser(emailId, newUser);
            if(response){
                return {status: "success"}
            }
            return {status: "success"}

        }
        catch(err){
            console.error(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {status:"failure",error:err.message};
        }
    }
}