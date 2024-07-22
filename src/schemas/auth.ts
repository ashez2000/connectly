import { z } from 'zod'

const requiredString = z.string().min(1, 'Required')

export const signupSchema = z.object({
  username: requiredString.regex(
    /^[a-z0-9_-]+$/i,
    'Only letters, numbers, - and _ allowed'
  ),
  email: requiredString.email('Invalid email address'),
  password: requiredString.min(6, 'Must be atleast 6 characters'),
})

export type SignupInput = z.infer<typeof signupSchema>

export const signinSchema = z.object({
  username: requiredString,
  password: requiredString,
})

export type SigninInput = z.infer<typeof signinSchema>
