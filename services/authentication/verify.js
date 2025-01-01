// Verifying user/builder
export default function buildVerifyUserInDb(userDb){
    return async function verifyUser(username){
        try{
            let result=await userDb.verifyUser(username);
            return result;
        }
        catch(err){
            console.error(err);
        }
    }
}