import { } from "mongoose";
import User, { UserInput } from "../models/user.model";
import { omit } from "lodash";

export async function CreateUser(input: UserInput) {
  try {
    const user = await User.create(input);
    return omit(user.toJSON(),"password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({ email, password }: { email: string, password: string }) {
  const user = await User.findOne({ email });

    if(!user){
      return false;
    }
    const isValid = await user.comparePassword(password);
    if(!isValid){
      return false;
    }
   
    return omit(user.toJSON(),"password");

}