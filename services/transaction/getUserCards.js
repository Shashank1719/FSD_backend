export default function buildGetUserCards(transactionDb) {
    return async function getUserCards(emailId) {
        try {
            let cards = await transactionDb.getUserCards(emailId);
            return {
                status: "success",
                cards: cards
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