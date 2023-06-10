import logger from "../utils/logger";
import {Request,Response} from "express"

import {CreateUser} from "../services/user.services";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export const createUserHandler =async (req:Request<{},{},CreateUserInput['body']>,resp:Response)=>{
    try {
        const user = await CreateUser(req.body);;
       return resp.status(201).json({
            user
        })
        
    } catch (error:any) {
        logger.error(error);
        return resp.status(409).send(error.message)
    }
}