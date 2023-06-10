import { FilterQuery } from "mongoose";
import sessionModel, { SessionInput } from "../models/session.model";

export const createSession =async (userId:string,userAgent:string)=>{

    const session = await sessionModel.create({user:userId,userAgent});
    return session.toJSON(); 

}
export const findSession =async (query:FilterQuery<SessionInput>)=>{
   return await sessionModel.find(query).lean(); 
}