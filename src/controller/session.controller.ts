import logger from "../utils/logger";
import { Request, Response } from "express"
import { createSession,findSession } from "../services/session.services"
import { validatePassword } from "../services/user.services";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export const createUserSessionHandler = async (req: Request, resp: Response) => {

        // validate the user password
        const user = await validatePassword(req.body);
        if (!user) {
            return resp.status(401).send("Invalid Email or password.")
        }
        // create a session
        const session = await createSession(user._id, req.get("user-agent") || "")
        // create a access token
        const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get("accessTokenTTL") });
        // create a refresh token
       const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get("refreshTokenTTL") });
        // retrun access and refresh token
        resp.send({accessToken,refreshToken});

}
// export async function createUserSessionHandler(req: Request, res: Response) {
//     // Validate the user's password
//     const user = await validatePassword(req.body);
  
//     if (!user) {
//       return res.status(401).send("Invalid email or password");
//     }
  
//     // create a session
//     const session = await createSession(user._id, req.get("user-agent") || "");
  
//     // create an access token
  
//     const accessToken = signJwt(
//       { ...user, session: session._id },
//       "accessTokenPrivateKey",
//       { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
//     );
  
//     // create a refresh token
//     const refreshToken = signJwt(
//       { ...user, session: session._id },
//       "refreshTokenPrivateKey",
//       { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
//     );
  
//     // return access & refresh tokens
  
//     return res.send({ accessToken, refreshToken });
//   }
export const getUserSessionHandler =async (req:Request,resp:Response)=>{
      const userId = resp.locals.user_id;
      console.log(userId);

      const session = await findSession({user:userId,valid:true})

      return resp.send(session);
}