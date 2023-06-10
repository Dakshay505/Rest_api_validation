import { AnyZodObject } from "zod";
import {Request,Response,NextFunction} from "express"


const validate = (schema:AnyZodObject)=>(req:Request,resp:Response,next:NextFunction)=>{
    try{
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query
        })
   next();
    }catch(e:any){
         return resp.status(400).send(e.error)
    }
}
export default validate;