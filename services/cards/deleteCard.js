export default function buildDeleteCard(cardDb, jwtController){
    return async function deleteCard(streamerEmailId, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            await cardDb.permaDelete(streamerEmailId);
            return {"status": "success"};
        }
        catch(err){
            console.error(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {"status": "failure", "error": err.message};
        }
    }
}