// Verifying user/builder
export default function buildVerifyUserInDb(userDb, jwtController){
    return async function verifyUser(httpBody, token){
        try{
            let emailId=httpBody.emailId;
            let otp=httpBody.otp;
            let password=httpBody.password;
            if (!emailId || !otp || !password) {
                return {"verify": false, "error": "Please provide emailId, otp and password"}
            }
            let result=await userDb.verifyUser(emailId,otp,password);
            return result;
        }
        catch(err){
            console.error(err);
            return {"verify": false, "error": err.message}
        }
    }
}