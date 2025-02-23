export default function buildDeleteCard(cardDb){
    return async function deleteCard(streamerEmailId){
        try{
            await cardDb.permaDelete(streamerEmailId);
            return {"status": "success"};
        }
        catch(err){
            console.error(err);
            return {"status": "failure", "error": err.message};
        }
    }
}