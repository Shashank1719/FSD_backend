// Deleting user in database
export default function buildDeleteUserInDb(userDb, jwtController){
    return async function deleteUser(username, token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let result=await userDb.deleteUser(username);
            return result;
        }
        catch(err){
            console.error(err);
        }
    }
}