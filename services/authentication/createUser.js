import { makeUser } from "../../model";
export  function buildCreateUser(userDb){
    return async function createUser(httpBody){
        try{
            httpBody.dateOfBirth = new Date(httpBody.dateOfBirth)
            httpBody.username = httpBody.emailId
            httpBody.createdAt = new Date()
            httpBody.userName = httpBody.emailId.split('@')[0]
            const user=makeUser({
                ...httpBody
            });
            let registeredUser=await userDb.register(user,httpBody.password);
            return{signUp:true,Message:"User successfully signed up"};
        }catch(err){
            console.log(err.message);
            return{signUp:false,Error:err.message}
        }
    };
}
