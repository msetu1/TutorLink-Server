/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export type TLoginUser = {
  email: string;
  password: string;
};
export type TRegisterStudent = {
  email: string;
  image: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  role: string;
  isDeactivate?: boolean;
  thana?: string;
  district?: string;
  selectedThanas?: string[];
};
export type TRegisterTutor = {
  email: string;
  image: string;
  name: string;
  password?: string;
  passwordConfirm: string;
  phone: string;
  role: string;
  isDeactivate?: boolean;
  thana?: string;
  district?: string;
  selectedThanas?: string[];
};

export interface UserModel extends Model<TRegisterStudent> {
  isUserExistsEmail(email: string): Promise<TRegisterStudent>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
