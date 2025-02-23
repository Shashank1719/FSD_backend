export default function buildGetStreamers(userDb, jwtController){
    return async function getStreamers(token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.returnAllStreamers();
            console.log(response)
            return {status:"success",streamers:response};
        }
        catch(err){
            console.error(err);
            return {status:"failure",error:err};
        }
    }
}