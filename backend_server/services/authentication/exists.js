// Checking for existing user
export default function existingCheck(db){
    return async function existing(companyName){
        try{
            let user=await db.exists(companyName)
            // console.log(user)
            return{user};
        }catch(err){
            console.log(err);
            return{Error:err};
        }
    }
}