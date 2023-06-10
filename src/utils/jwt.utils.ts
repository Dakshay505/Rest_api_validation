import jwt from "jsonwebtoken";
import config from "config";

const privatekey = config.get<string>("privatekey");
const publickey = config.get<string>("publickey")


export const signJwt = (
    object:object , options ?:jwt.SignOptions | undefined
)=>{
    return jwt.sign(object,privatekey,{
        ...(options && options),"algorithm":"RS256"
    });
}
export const verifyJwt = (token:string)=>{
    try {
        const decoded = jwt.verify(token,publickey);
        return {
            valid:true,
            expired:false,
            decoded
        }
    } catch (error:any) {
        return {
            valid:false,
            expired :error.message === "jwt expired",
            decoded :null
        }
    }

}