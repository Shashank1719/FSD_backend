import { buildTransaction } from "../../model";
export default function buildCreateTransaction(transactionDb, jwtController) {
    return async function createTransaction(httpBody, emailId, token) {
        try {
            const jwt_avail = await jwtController.verify(token);
            httpBody.userEmailId = emailId;
            httpBody.purchaseDate = new Date()
            console.log(httpBody)
            const transaction = buildTransaction({...httpBody})
            console.log(transaction)
            await transactionDb.create(transaction);
            return {
                status: "success",
                message: "Transaction added successfully"
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