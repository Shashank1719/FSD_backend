export default function buildJwtController(jwt,secret){
    
    function verify(token){
        return new Promise((resolve, reject)=>{
            jwt.verify(token,secret,(err,decoded)=>{
                if(!err){
                    if(decoded){
                        return resolve(decoded);
                    }
                }
                return reject(new Error(err.name));
                });
            });
        }
    function sign(user){
        return new Promise((resolve, reject)=>{
            console.log(user);
            jwt.sign(user,secret,{ expiresIn: '1d' },(err,token)=>{
                if(!err){
                    if(token){
                        return resolve(token);
                    }
                }

                return reject(new Error(err));
               });
           });
    }

 
    return Object.freeze({
        verify:verify,
        sign:sign,
    });
}