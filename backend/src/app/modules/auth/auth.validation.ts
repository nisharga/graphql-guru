import { z } from "zod";
 
// User schema validation

const userRegisterSchemaValidation = z.object({
 body: z.object({ 
  email: z
   .string({
    required_error: "email is required",
    invalid_type_error: "invalid type",
   })
   .email("Invalid email address"),
  password: z
   .string({
    required_error: "password is required",
    invalid_type_error: "invalid type",
   })
   .min(6, "Password must be at least 6 characters long"), 
 }),
});

const userLoginValidation = z.object({
 body: z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
 }),
});

export const authValidations = {
 userRegisterSchemaValidation,
 userLoginValidation,
};
