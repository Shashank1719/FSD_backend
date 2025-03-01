export default function buildGetUserCards(transactionDb, jwtController) {
    return async function getUserCards(emailId, token) {
        try {
            let cards = await transactionDb.getUserCards(emailId);
            return {
                status: "success",
                cards: cards
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