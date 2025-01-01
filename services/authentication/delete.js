// Deleting user in database
export default function buildDeleteUserInDb(userDb){
    return async function deleteUser(username){
        try{
            let result=await userDb.deleteUser(username);
            return result;
        }
        catch(err){
            console.error(err);
        }
    }
}