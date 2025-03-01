export default function buildMakeUser(){
    return function buildMakeUser({
        username,
        userName,
        emailId,
        mobileNumber,
        dateOfBirth,
        createdAt,
        youtubeLink,
        instagramLink,
        description
    }){
        if(!username){
            throw new Error("Username is empty");
        }
        if(username.length<2){
            throw new Error("Username very small");
        }
        if(!emailId){
            throw  new Error("Email is empty");
        }
        if(emailId.length<2){
            throw new Error("Email very small");
        }
        if(!mobileNumber){
            throw new Error("contactNumber is empty");
        }
        return Object({
            username:username,
            userName:userName,
            emailId:emailId,
            mobileNumber:mobileNumber,
            dateOfBirth:dateOfBirth,
            createdAt:createdAt,
            user_type: "viewer",
            isVerified:false,
            youtubeLink:"",
            instagramLink:"",
            description:""
        })
    }
}