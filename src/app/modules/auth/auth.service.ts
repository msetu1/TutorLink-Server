import jwt from 'jsonwebtoken';
import config from '../../config';
import { TLoginUser, TRegisterTutor, TRegisterStudent } from './auth.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { createToken, loginUserEmail } from './auth.utils';
import { UserRegister } from './auth.model';

// const loginUser = async (payload: TLoginUser) => {

//   const user = await UserRegister.isUserExistsEmail(payload?.email);
//   console.log("user",user);

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//   }

//   // checking if the user is blocked
//   const userStatus = user?.isDeactivate;

//   if (userStatus === true) {
//     throw new AppError(StatusCodes.FORBIDDEN, 'This user is deactivated !');
//   }

//   // checking if the password is correct
//   if (
//     !(await UserRegister.isPasswordMatched(payload?.password, user?.password))
//   )
//     throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

//   //create token and sent to the  client
//   const jwtPayload = {
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     role: user.role,
//     image: user.image,
//   };

//   // console.log(jwtPayload);

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const decodedAccessToken = jwt.decode(accessToken) as { email: string };
//   const emailFromAccessToken = decodedAccessToken?.email;

//   loginUserEmail(emailFromAccessToken);

//   return {
//     accessToken,
//     email: payload.email,
//   };
// };

const loginUser = async (payload: TLoginUser) => {
  const user = await UserRegister.isUserExistsEmail(payload?.email);
  console.log('user:', user);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }

  // Check if the user is deactivated
  if (user?.isDeactivate) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deactivated!');
  }

  // Check if the password is correct
  const isPasswordValid = await UserRegister.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordValid) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match!');
  }

  // JWT Payload
  const jwtPayload = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    image: user.image,
  };

  // Ensure JWT expiration time is valid
  const expiresIn = config.jwt_access_expires_in || '1h'; // Fallback to "1h" if undefined

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    expiresIn,
  );

  // Decode JWT to get email
  const decodedAccessToken = jwt.decode(accessToken) as { email: string };
  const emailFromAccessToken = decodedAccessToken?.email;

  loginUserEmail(emailFromAccessToken);

  return {
    accessToken,
    email: payload.email,
  };
};

const registerStudent = async (payload: TRegisterStudent) => {
  const result = await UserRegister.create(payload);
  return result;
};
const registerTutor = async (payload: TRegisterTutor) => {
  // console.log(payload);
  const result = await UserRegister.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserRegister.find();
  return result;
};

const deactiveAccount = async (id: string) => {
  // console.log(id);
  const result = await UserRegister.findByIdAndUpdate(id, {
    isDeactivate: true,
  });
  return result;
};
const activeAccountIntoDB = async (id: string) => {
  // console.log(id);
  const result = await UserRegister.findByIdAndUpdate(id, {
    isDeactivate: false,
  });
  return result;
};

const changeRoleFromDB = async (userInfo: { role: string; email: string }) => {
  // console.log('service ', userInfo);

  const result = await UserRegister.findOneAndUpdate(
    { email: userInfo.email },
    { role: userInfo.role },
  );
  return result;
};
export const AuthServices = {
  loginUser,
  registerStudent,
  registerTutor,
  getAllUserFromDB,
  deactiveAccount,
  activeAccountIntoDB,
  changeRoleFromDB,
};
