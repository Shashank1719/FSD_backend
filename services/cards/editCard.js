export default function buildEditCard(cardDb) {
    return async function editPost(id, newContent) {
        try{
            let result = await cardDb.editCard(id, newContent)
            return {"status": "success"}
        }catch(err) {
            return {"status": "failure", "error": err.message}
        }
    }
}