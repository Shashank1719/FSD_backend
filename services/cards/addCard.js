import { buildCard } from "../../model";
export default function buildCreateCard(cardDb) {
    return async function createCard(httpBody, emailId) {
        try {
            httpBody.userEmailId = emailId;
            const card = buildCard({...httpBody})
            await cardDb.create(card);
            return {
                status: "success",
                message: "Card added successfully"
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