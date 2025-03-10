import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const createRegisterStudent = catchAsync(async (req, res) => {
  const result = await AuthServices.registerStudent(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successfully',
    data: result,
  });
});
const createRegisterTutor = catchAsync(async (req, res) => {
  const result = await AuthServices.registerTutor(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'logged in successfully!',
    data: {
      accessToken,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User information retrieved successfully',
    data: result,
  });
});
const DeactivateAccount = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await AuthServices.deactiveAccount(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Account Deactivate successfully',
    data: result,
  });
});
const ActivateAccount = catchAsync(async (req, res) => {
  // console.log(req.body.id);
  const result = await AuthServices.activeAccountIntoDB(req.body.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Account Activate successfully',
    data: result,
  });
});
const ChangeRole = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.id);

  const result = await AuthServices.changeRoleFromDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Role Changed successfully',
    data: result,
  });
});

export const AuthController = {
  createRegisterStudent,
  createRegisterTutor,
  loginUser,
  getAllUser,
  DeactivateAccount,
  ActivateAccount,
  ChangeRole,
};
