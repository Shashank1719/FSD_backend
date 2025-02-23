export default function buildLogin(db){
    return async function login(httpBody){
        try{
            let token=await db.login(httpBody);
            console.log(token)
            if(token){
                return{login:true,token:token.token,user:token.user,verify:true,user_type:token.user_type,expiresIn:86400};
            }
            return{login:false, verify:false}
        }catch(err){
            console.log(err);
            return{login:false,error:err.message};
        }
    }
}