import { TypeOf, object, string } from "zod";
export const createUserSchema = object({
    body:object({
        name:string({
            required_error:"Name is required"
        }),
        password:string({
            required_error:"Password can't be empty"
        }).min(6,"Password should be minimum length of 6."),
        passwordConfirmation:string({
            required_error:"PasswordConfirmation is required."
        }),
        email:string({
            required_error:"Email is required."
        }).email("Enter a valid email.")
    }).refine((data)=> data.password === data.passwordConfirmation ,{
        message:"Password does'nt match.",
        path:["passwordConfirmation"]
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>