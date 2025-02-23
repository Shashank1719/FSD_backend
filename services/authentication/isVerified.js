export default function buildIsVerified(userDb, jwtController){
    return async function isVerified(emailId, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.returnIsVerifed(emailId);
            if(response){
                return {isVerified: true}
            }
            return {isVerified: false}

        }
        catch(err){
            console.error(err);
        }
    }
}