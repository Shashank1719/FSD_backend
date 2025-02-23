import { get } from "mongoose";
import { sendJsonToQueue } from "./publisher";
import { consumeJsonFromQueue } from "./consumer";
export default function buildTransactionDb(transactionModel, cardModel) {

    async function create(rawTransaction) {
        console.log("rawTransaction",rawTransaction)
        let newTransaction = new transactionModel({...rawTransaction});

        try {
            
            newTransaction.save()

            return {status: "Transaction Added Successfully"}

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
        let cards=await cardModel.find({_id:name},null,null);
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

    async function getUserCards(emailId) {
        try{
            let userTransactions = await transactionModel.find({userEmailId:emailId},null,null);
            let cardsToReturn = [];
            for (let i = 0; i < userTransactions.length; i++) {
                let card = await cardModel.findOne({_id:userTransactions[i].cardId},null,null);
                if (card) {
                    card = card.toObject();
                    card.transactionId = userTransactions[i]._id
                    card.isUsed = userTransactions[i].isUsed    
                    if (userTransactions[i].isUsed) {
                        card.cardTitle=userTransactions[i].title || card.cardTitle;
                        card.description=userTransactions[i].description || card.description;
                        console.log("Updating the card as per title")
                    }
                }
                cardsToReturn.push(card);
            }
            return cardsToReturn
        }
        catch(err){
            throw err;
        }
    }

    async function useCard(cardData, emailId, newTitle, newDescription){
        try{
            let card = await cardModel.findOne({_id:cardData.cardId},null,null);
            if (!card) {
                return false
            }
            card = card.toObject();
            if (newTitle && newDescription) {
                console.log("transactionId",cardData.transactionId)
                console.log("Updating the card as per title and description")
                card.cardTitle=newTitle;
                card.description=newDescription;
                await sendJsonToQueue(emailId, card);
                await transactionModel.findOneAndUpdate(
                    {_id : cardData.transactionId}, 
                    {isUsed: true, title: newTitle, description: newDescription}, 
                    { upsert: true, setDefaultsOnInsert: true }
                );

                return true
            }
            if (newTitle) {
                card.title=newTitle;
                await sendJsonToQueue(emailId, card);
                await transactionModel.findOneAndUpdate(
                    {_id : cardData.transactionId}, 
                    {isUsed: true, title: newTitle}, 
                    { upsert: true, setDefaultsOnInsert: true }
                );

                return true
            }
            if (newDescription) {
                card.description=newDescription;
                await sendJsonToQueue(emailId, card);
                await transactionModel.findOneAndUpdate(
                    {_id : cardData.transactionId}, 
                    {isUsed: true, description: newDescription}, 
                    { upsert: true, setDefaultsOnInsert: true }
                );

                return true
            }
            await sendJsonToQueue(emailId, card)
            console.log("transactionId",cardData.transactionId)
            await transactionModel.findOneAndUpdate(
                {_id : cardData.transactionId}, 
                {isUsed: true}, 
                { upsert: true, setDefaultsOnInsert: true })
            return true
        }
        catch(err){
            throw err;
        }
    }

    async function getCardFromQueue(emailId){
        try{
            console.log("In getCardFromQueue",emailId);
            let cardsToReturn = await consumeJsonFromQueue(emailId);
            return cardsToReturn
        }
        catch(err){
            throw err;
        }
    }

    return Object.freeze({
        getCards:getCards,
        create:create,
        getCards:getCards,
        getCardsByStreamer:getCardsByStreamer,
        editCard:editCard,
        permaDelete:permaDelete,
        getUserCards:getUserCards,
        useCard:useCard,
        getCardFromQueue:getCardFromQueue
    })

}
