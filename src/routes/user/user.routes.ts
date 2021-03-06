import { Router } from "express";

import userCreateController from "../../controllers/users/userCreate.controller";
import userLoginController from "../../controllers/login/userLogin.controller";
import userDeleteController from "../../controllers/users/deleteUser.controller";
import passwordUpdateController from "../../controllers/users/passwordUpdate.controller";
import roleUpdateController from "../../controllers/users/roleUpdate.controller";
import userListAllSuppliersController from "../../controllers/users/userListAllSuppliers.controller";
import userListOneController from "../../controllers/users/userListOne.controller";
import userUpdateController from "../../controllers/users/userUpdate.controller";

import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyPassword from "../../middlewares/userMiddlewares/verifyPassword.middleware";
import verifyDuplicatedEmail from "../../middlewares/userMiddlewares/verifyDuplicatedEmail.middleware";

import { expressYupMiddleware } from "express-yup-middleware";

import createUserSchema from "../../validations/User/crateUser.validation";
import loginUserSchema from "../../validations/User/loginUser.validation";
import updateRoleSchema from "../../validations/User/updateRoleUser.validation";
import updateUserSchema from "../../validations/User/updateUser.validation";
import updatePasswordSchema from "../../validations/User/updatePassword.validation";

const userRoutes = Router();

userRoutes.post(
  "/signup",
  expressYupMiddleware({ schemaValidator: createUserSchema }),
  verifyDuplicatedEmail,
  userCreateController
);

userRoutes.post(
  "/signin",
  expressYupMiddleware({ schemaValidator: loginUserSchema }),
  userLoginController
);

userRoutes.use(ensureAuth);

userRoutes.get("/me", userListOneController);
userRoutes.get("/suppliers", userListAllSuppliersController);

userRoutes.patch(
  "/me",
  expressYupMiddleware({ schemaValidator: updateUserSchema }),
  verifyDuplicatedEmail,
  userUpdateController
);

userRoutes.patch(
  "/password",
  expressYupMiddleware({ schemaValidator: updatePasswordSchema }),
  verifyPassword,
  passwordUpdateController
);

userRoutes.patch(
  "/role",
  expressYupMiddleware({ schemaValidator: updateRoleSchema }),
  verifyPassword,
  roleUpdateController
);

userRoutes.delete("/me", userDeleteController);

export default userRoutes;
