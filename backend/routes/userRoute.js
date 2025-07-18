import express from 'express';
import { registerUser, loginUser, adminLogin, getUserProfile, updateProfileImage, changeUserPassword } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/profile', authUser, getUserProfile);
userRouter.post('/profile/change-password', authUser ,changeUserPassword);
userRouter.post('/profile/update-image', 
  upload.fields([{ name: 'image', maxCount: 1 }]), 
  updateProfileImage
);


export default userRouter;