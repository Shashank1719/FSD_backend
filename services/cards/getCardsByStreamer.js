export default function buildGetCardsByStreamer(cardDb){
    return async function getCardsByStreamer(streamerEmailId){
        try{
            let cards=await cardDb.getCardsByStreamer(streamerEmailId);
            return {"status": "success", "cards": cards};
        }
        catch(err){
            console.error(err);
            return {"status": "failure", "error": err.message};
        }
    }
}