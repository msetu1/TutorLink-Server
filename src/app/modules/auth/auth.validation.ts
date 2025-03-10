import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Id is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});
const RegisterValidationSchemaStudent = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  phone: z.string(),
  password: z.string({ required_error: 'Password is required.' }),
  role: z.enum(['tutor', 'student']),
  isBlocked: z.boolean().default(false),
  image: z.string(),
});
const RegisterValidationSchemaTutor = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  phone: z.string(),
  password: z.string({ required_error: 'Password is required.' }),
  role: z.enum(['tutor', 'student']),
  isBlocked: z.boolean().default(false),
  image: z.string(),
});
export const AuthValidation = {
  loginValidationSchema,
  RegisterValidationSchemaStudent,
  RegisterValidationSchemaTutor,
};
