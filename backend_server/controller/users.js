export default function buildUserDb(userModel,jwtController){
    async function register(rawUser,password){
        let newUser=new userModel({...rawUser});
        try{
            await userModel.register(newUser,password);

            const token=await jwtController.sign(newUser.username);
            newUser.save();
            return {token:token,user:newUser.username};
        }catch(err){
            userModel.deleteOne({username:newUser.username});
            console.log(err)
            throw err;
        }
    }
    async function exists(username) {
        let isAvailable = await userModel.exists({ username: username });
        return isAvailable;
    }
    async function login(loginUser) {
        //console.log(loginUser);
        let authenticatedUser;
    
        try {
          authenticatedUser = await userModel.authenticate()(
            loginUser.username,
            loginUser.password
          );
          
    
          if (authenticatedUser.user) {
            const token = await jwtController.sign(authenticatedUser.user.username);
            console.log(authenticatedUser)
            return {token:token,user:authenticatedUser.user.username};
          } else {
            throw authenticatedUser.error;
          }
        } catch (err) {
          throw err;
        }
    }
    // Verifying user profile
    async function verifyUser(username) {

      let result = await userModel.updateOne({_id:username}, {isVerified: "true"})
      return result
    }

    // Deleting user profile
    async function deleteUser(username) {
      try {
          await userModel.deleteOne({_id:username})
          return {deleted:true}
      } catch (error) {
        return {error}
      }
    }

    //  Activating user profile
    async function activateUser(username) {
      let result = await userModel.updateOne({_id:username}, {isActive: "true"})
      return result
    } 
    async function showUserInfo(username) {
      let user = await userModel.findOne({username})
      return user;
    }
    return Object.freeze({
        register:register,
        exists:exists,
        login:login,
        verifyUser,
        deleteUser,
        showUserInfo,
    });
}
