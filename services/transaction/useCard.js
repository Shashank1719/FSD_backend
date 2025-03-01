export default function buildUseCard(transactionDb, jwtController) {
    return async function useCard(cardData, emailId, token) {
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
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {
                status: "failure",
                message: err.message
            }
        }
    }
}