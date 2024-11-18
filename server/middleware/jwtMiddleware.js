// const jwt = require('jsonwebtoken');

// const createToken = jwt.sign(payload,process.env.PRIVATE_KEY,(err,token)=>
// {
//     if(err){
//         console.error("INVALID:",err.message)
//     }
//     else{
//         console.log(token);
//     }
// })

// const valiadtion = jwt.verify(token,process.env.PRIVATE_KEY);

// jwt.verify(token,process.env.PRIVATE_KEY,function(err,decoded)
// {
//     console.log(decoded.foo)
// });

// try{
//     var decoded = jwt.verify(token,'wrong-secret');

// }catch(err) {
//     // err
    
//   }
  
//   // invalid token
//   jwt.verify(token, 'wrong-secret', function(err, decoded) {
//     // err
//     // decoded undefined
//   });

var jwt = require('jsonwebtoken');
//module needed

// const generateToken=(userData)=>{
//     //in this function we are craeting a new/fresh jwt token to provide user, for login/ session management or for authorization purpose.
//     return jwt.sign(userData,process.env.PRIVATE_KEY);
// }

const validateJwtToken =(req,res,next)=>{ 
    //first we are checking that jwt token is available or not 
    const authorization= req.headers.authorization;
    //output: 1. bearer string 
    //output: 2. whfhudfnjenfijrn
    //output: 3. 
    //output: 4. token bna hi nhi hai local ay end point testing se bheja hooo means without token  

    if(!authorization){
        console.log("Authorization header missing");
        return res.status(401).json({err:'Token dont available'})
    }
    // we are storing the token value form 
    const token = req.headers.authorization.split(' ')[1]

    //toekn provided is wrong , throw error ,message 
    if(!token){
        console.log("Token not found after splitting header");
        return req.status(401).json({err:'unauthorized user'});
    }

    try{
        // in this error handler try catch :
        // we are handling , if token is validated or verified , then move to next middleware or respond backj to client 
        const valiadteToken = jwt.verify(token,proces.env.PRIVATE_KEY);
        req.user=valiadteToken;
        console.log("token validated successfully");
        next();
    }
    catch(err){
        console.log("error handling tokem:",err.message);
        console.error("Error occured : ",err.message);

    }
};

module.exports = {validateJwtToken};