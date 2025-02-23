const { sendOTP, verifyOTP } = require('./otpVerification');
export default function buildUserDb(userModel,jwtController){
    async function register(rawUser,password){
        let newUser=new userModel({...rawUser});
        try{
          await userModel.register(newUser,password);
          await sendOTP(newUser.emailId);
            const token=await jwtController.sign(newUser.emailId);
            newUser.save();
            return {token:token,user:newUser.emailId};
        }catch(err){
            userModel.deleteOne({username:newUser.emailId});
            console.log(err)
            throw err;
        }
    }
    async function exists(emailId) {
        let isAvailable = await userModel.exists({ emailId: emailId });
        return isAvailable;
    }
    async function login(loginUser) {
        console.log(loginUser);
        let authenticatedUser;
        try {
          let verifyStatus=await returnIsVerified(loginUser)
          if(!verifyStatus.verify && verifyStatus.result){
            sendOTP(loginUser.emailId)
            return false;
          }
          if(!verifyStatus.result){
            throw new Error("User not exists");
          }
          authenticatedUser = await userModel.authenticate()(
            loginUser.emailId,
            loginUser.password
          );
          if (authenticatedUser.user) {
            const token = await jwtController.sign(authenticatedUser);
            console.log(authenticatedUser)
            let result = await userModel.findOne({emailId:loginUser.emailId})
            return {token:token,user:authenticatedUser.user.emailId,user_type:result.user_type};
          } else {
            throw authenticatedUser.error;
          }
        } catch (err) {
          throw err;
        }
    }
    // Verifying user profile
    async function verifyUser(email, otp, password) {
      try{
        let status = await verifyOTP(email, otp);
        if(status){
          await userModel.updateOne({emailId:email}, {isVerified: true})
          let token=await login({emailId:email,password:password});
          let result = await userModel.findOne({emailId:email})
          token["user_type"]=result.user_type
          token["verify"]=true
          return token
        }
        return {"verify": false, "error": "Invalid OTP"};
      }
      catch(err){
        return {"verify": false,"error": err.message}
      }
    }

    // Deleting user profile
    async function deleteUser(emailId) {
      try {
          await userModel.deleteOne({emailId:emailId})
          return {deleted:true}
      } catch (error) {
        return {error}
      }
    }

    //  Activating user profile
    async function returnIsVerified(loginUser) {
      let result = await userModel.findOne({emailId:loginUser.emailId})
      if(result && result.isVerified){
        return {result: true, verify: true}
      }
      if(!result){
        return {result: false, verify: false}
      }
      return {result: true, verify: false}
    } 

    async function makeStreamer(email) {
      try{
          await userModel.updateOne({emailId:email}, {user_type: "creator"})
        }
      catch(err){
        throw err
      }
    }

    async function showUserInfo(emailId) {
      let user = await userModel.findOne({emailId:emailId})
      return user;
    }
    
    async function returnAllStreamers() {
      let streamers = await userModel.find({user_type: "creator"});
      return streamers;
    }
    async function returnAllUsers() {
      let users = await userModel.find(null,null,null);
      return users;
    }
    
    return Object.freeze({
        register:register,
        exists:exists,
        login:login,
        verifyUser,
        deleteUser,
        showUserInfo,
        returnIsVerified,
        makeStreamer,
        returnAllStreamers,
        returnAllUsers
    });
}
