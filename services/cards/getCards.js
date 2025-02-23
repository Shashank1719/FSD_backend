export default function buildGetCards(cardDb){
    return async function getCards(){
        try{
            console.log("getCards");
            let cards=await cardDb.getCards();
            return {"status": "success", "cards": cards};
        }
        catch(err){
            console.error(err);
            return {"status": "failure", "error": err.message};
        }
    }
}