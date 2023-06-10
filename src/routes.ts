import { Express,Request,Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResourse";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";


function routes(app:Express){
    app.get("/",(req:Request,resp:Response)=>resp.status(200).json({message:"working good"}))
    app.post("/api/users",validate(createUserSchema) ,createUserHandler);
    app.post("/api/sessions",validate(createSessionSchema) ,createUserSessionHandler);
    app.get("/api/sessions",requireUser,getUserSessionHandler);
}
export default routes;