export default function buildGetCardsByStreamer(cardDb, jwtController){
    return async function getCardsByStreamer(streamerEmailId, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let cards=await cardDb.getCardsByStreamer(streamerEmailId);
            return {"status": "success", "cards": cards};
        }
        catch(err){
            console.error(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {"status": "failure", "error": err.message};
        }
    }
}