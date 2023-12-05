import { z } from "zod";
import { password } from "./generics";



export const updateUserSchema = z.object({
oldPassword: password,
newPassword: password,
confirmPassword: password,
}).superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must match new password',
        path: ['confirmNewPassword'],
      });
    }
  });;