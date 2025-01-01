export default function buildShowUserInfo(userDb){
    return async function showUserInfo(username){
        try{
            let response=await userDb.showUserInfo(username);
            return response;
        }
        catch(err){
            console.error(err);
        }
    }
}