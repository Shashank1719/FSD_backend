export default function buildUseCard(transactionDb) {
    return async function useCard(cardData, emailId) {
        try {
            const newTitle = cardData.cardTitle;
            const newDescription = cardData.description;
            
            let status = await transactionDb.useCard(cardData, emailId, newTitle, newDescription);
            if (status) {
                return {
                    status: "success",
                    message: "Card used successfully"
                }
            }
        } catch (err) {
            console.log(err)
            return {
                status: "failure",
                message: err.message
            }
        }
    }
}