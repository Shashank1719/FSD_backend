export default function buildMakeCard(){
    return function buildMakeCard({
        cardTitle,
        description,
        imageUrl,
        category,
        rarity,
        price,
        global,
        userEmailId,
        streamerEmailId
    }){
        return Object({
            cardTitle:cardTitle,
            description:description,
            imageUrl:imageUrl,
            category:category,
            rarity:rarity,
            price:price,
            global:global,
            userEmailId:userEmailId,
            streamerEmailId:streamerEmailId
        })
    }
}