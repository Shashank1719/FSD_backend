export default function buildLogin(db){
    return async function login(httpBody){
        try{
            let token=await db.login(httpBody);
            console.log(token)
            return{token};
        }catch(err){
            console.log(err);
            return{Error:err};
        }
    }
}