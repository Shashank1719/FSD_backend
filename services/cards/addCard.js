import { buildCard } from "../../model";
export default function buildCreateCard(cardDb, jwtController) {
    return async function createCard(httpBody, emailId, token) {
        try {
            const jwt_avail = await jwtController.verify(token);
            httpBody.userEmailId = emailId;
            const card = buildCard({...httpBody})
            await cardDb.create(card);
            return {
                status: "success",
                message: "Card added successfully"
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