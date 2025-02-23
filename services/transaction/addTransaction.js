import { buildTransaction } from "../../model";
export default function buildCreateTransaction(transactionDb) {
    return async function createTransaction(httpBody, emailId) {
        try {
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
            return {
                status: "failure",
                message: err.message
            }
        }
    }
}