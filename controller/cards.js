export default function buildCreateCardDb(cardModel) {

    async function create(rawCard) {

        let newCard = new cardModel({...rawCard});

        try {
            
            newCard.save()

            return {status: "Card Added Successfully"}

        } catch (err) {
            
            throw err

        }

    }
    async function getCards(){
        let cards=await cardModel.find(null,null,null);
        return cards;
    }
    async function getPostByPostName(name){
        let post=await postModel.find({_id:name},null,null);
        return post;
    }
    async function getCardsByStreamer(name){
        let cards=await cardModel.find({streamerEmailId:name},null,null);
        return cards;
    }

    async function permaDelete(name){
        try{
            await cardModel.deleteOne({_id:name});
            return{deleted:true};
        }
        catch(err){
            throw err;
        }
    }

    async function editCard(id, newContent) {
        try {
            let post = await cardModel.findOneAndUpdate(
                {_id : id}, 
                newContent, 
                { upsert: true, setDefaultsOnInsert: true })

            return {updated: true}
        } catch (error) {
            throw error
        }
    }

    return Object.freeze({
        getCards:getCards,
        create:create,
        getCards:getCards,
        getCardsByStreamer:getCardsByStreamer,
        editCard:editCard,
        permaDelete:permaDelete
    })

}
