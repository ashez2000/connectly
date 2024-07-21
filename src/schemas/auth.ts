import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
})

export type SignupInput = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type SigninInput = z.infer<typeof signinSchema>
