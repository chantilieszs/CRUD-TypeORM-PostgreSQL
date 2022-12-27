import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middleware/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middleware/ensureDataIsValid.middleware";
import { userIsAdmMiddleware, userIsAdmUpdateMiddleware,  } from "../middleware/ensureUserIsAdm.middleware";
import { userSerializer, updateUserSerializer } from "../serializers/user.serializers";

const userRouter = Router();

userRouter.post('', ensureDataIsValidMiddleware(userSerializer), createUserController)
userRouter.get('', ensureAuthMiddleware, userIsAdmMiddleware, listUsersController)
userRouter.patch('/:id', ensureAuthMiddleware, userIsAdmUpdateMiddleware, ensureDataIsValidMiddleware(updateUserSerializer), updateUserController)
userRouter.delete('/:id', ensureAuthMiddleware, userIsAdmMiddleware, deleteUserController)


export default userRouter;