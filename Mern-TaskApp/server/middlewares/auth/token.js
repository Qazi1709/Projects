import jwt from "jsonwebtoken";

function validationMiddleware(req,res,next){
    
        try {
    
           let token = req.headers['auth-token'];
            req.payload = jwt.verify(token,'codeforindia');
            return next();
        } catch (error) {
    
            console.error(error);
            return res.status(401).json({error:"Unauthorised Access"});
        }
    }

    export default validationMiddleware;