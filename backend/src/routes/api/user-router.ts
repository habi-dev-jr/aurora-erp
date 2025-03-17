import {Router} from 'express';
import {checkSchema} from 'express-validator';
import {authenticateJWT} from '../../middlewares';
import {
  loginSchema,
  userDetail,
  updatePassword,
  createUser,
  updateUser,
} from '../../validators';
import multer from 'multer';
import {UserController} from '../../controllers';

// Export the base-router
const userRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

userRouter.post('/login', checkSchema(loginSchema), UserController.login);
userRouter.post('/register', checkSchema(createUser), UserController.register);
userRouter.get('/:userId',authenticateJWT,checkSchema(userDetail),UserController.getUserById);
userRouter.put('/:userId/update_password',authenticateJWT,checkSchema(updatePassword),UserController.updatePassword);
userRouter.put('/:userId/update',authenticateJWT,checkSchema(updateUser),UserController.updateUser);
// userRouter.get('/refresh_permission',authenticateJWT,UserController.refreshPermission);
// userRouter.post('/:userId/avatar',upload.single('image'),authenticateJWT,UserController.changeAvatar);

// Export default.
export default userRouter;
