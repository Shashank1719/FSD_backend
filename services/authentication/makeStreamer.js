// Verifying user/builder
export default function buildMakeStreamer(userDb, jwtController){
    return async function makeStreamer(emailId, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let result=await userDb.makeStreamer(emailId);
            return {"status": "success"};
        }
        catch(err){
            console.error(err);
            return {"status": "success", "error": err.message}
        }
    }
}