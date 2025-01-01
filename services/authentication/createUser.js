import { makeUser } from "../../model";
export  function buildCreateUser(userDb){
    return async function createUser(httpBody){
        try{
            httpBody.dateOfBirth = new Date(httpBody.dateOfBirth)
            httpBody.createdAt = new Date()
            const user=makeUser({
                ...httpBody
            });
            let registeredUser=await userDb.register(user,httpBody.password);
            return{signUp:true,token:registeredUser};
        }catch(err){
            console.log(err.message);
            return{signUp:false,Error:err.message}
        }
    };
}
