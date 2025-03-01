// Checking for existing user
export default function existingCheck(db, jwtController){
    return async function existing(companyName, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            console.log(jwt_avail);
            let user=await db.exists(companyName)
            // console.log(user)
            return{user};
        }catch(err){
            console.log(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return{status:"failure",error:err.message};
        }
    }
}