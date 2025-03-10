import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post('/register/student', AuthController.createRegisterStudent);
router.post('/register/tutor', AuthController.createRegisterTutor);

router.post('/admin/block-user', AuthController.DeactivateAccount);
router.post('/admin/make-active-user', AuthController.ActivateAccount);

router.get('/get-all-user-information', AuthController.getAllUser);

router.post('/admin/change-user-role', AuthController.ChangeRole);

export const AuthRoutes = router;
