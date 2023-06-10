import {Request,Response,NextFunction} from "express";

const requireUser  = (req:Request,resp:Response,next:NextFunction)=>{
    const user  = resp.locals.user;
    if(!user){
        return resp.status(403)
    }
    return next();
}
export default requireUser;