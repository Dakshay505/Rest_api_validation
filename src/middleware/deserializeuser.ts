import {Request,Response,NextFunction} from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";

export const deserializeUser = (req:Request,resp:Response,next:NextFunction)=>{
    // const accessToken = get(req,"headers.authorization","").replace(/^Bearer\s/,"");
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );
    console.log("accessToken",accessToken);

    if(!accessToken){
        return next();
    }
    const {decoded,expired} = verifyJwt(accessToken);
    if(!decoded){
        return next();
    }
    console.log("decoded",decoded);
  
    if(decoded){
        resp.locals.user = decoded;
        return next();
    }
}