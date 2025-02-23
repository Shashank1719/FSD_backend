export default function buildMakeTransaction(){
    return function buildMakeTransaction({
        cardId,
        streamerEmailId,
        userEmailId,
        isUsed,
        purchaseDate,
        title,
        description
    }){
        return Object({
            cardId:cardId,
            streamerEmailId:streamerEmailId,
            userEmailId:userEmailId,
            isUsed:false,
            purchaseDate:purchaseDate,
            title: "",
            description: ""
        })
    }
}