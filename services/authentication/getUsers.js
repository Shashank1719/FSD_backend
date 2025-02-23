export default function buildGetUsers(userDb, jwtController){
    return async function getUsers(token){
        try{
            const jwt_avail = await jwtController.verify(token);
            let response=await userDb.returnAllUsers();
            console.log(response)
            return {status:"success",users:response};
        }
        catch(err){
            console.error(err);
            return {status:"failure",error:err};
        }
    }
}