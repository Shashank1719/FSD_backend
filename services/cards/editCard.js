export default function buildEditCard(cardDb, jwtController) {
    return async function editPost(id, newContent, token) {
        try{
            const jwt_avail = await jwtController.verify(token);
            let result = await cardDb.editCard(id, newContent)
            return {"status": "success"}
        }catch(err) {
            console.error(err);
            if (err.message == "JsonWebTokenError" || err.message == "TokenExpiredError")
                { return {"status": "jwterror", "error": "Token Expired or Unauthenticated"}}
            return {"status": "failure", "error": err.message}
        }
    }
}