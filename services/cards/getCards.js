export default function buildGetCards(cardDb, jwtController){
    return async function getCards(token){
        try{
            const jwt_avail = await jwtController.verify(token);
            console.log("getCards");
            let cards=await cardDb.getCards();
            return {"status": "success", "cards": cards};
        }
        catch(err){
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            console.error(err);
            return {"status": "failure", "error": err.message};
        }
    }
}