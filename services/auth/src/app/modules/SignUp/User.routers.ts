import { Router } from "express";
import zodValidation from "../../helpers/zodValidation";
import { UserSchema } from "./User.schema";
import { UserController } from "./User.controller";


const UserRouter = Router();

UserRouter.post("/signup", zodValidation(UserSchema.singUpUserSchema), UserController.signUpUser);
UserRouter.post("/login", zodValidation(UserSchema.loginUserSchema), UserController.loginUser);
UserRouter.post("/verified", UserController.verifiedToken);
UserRouter.post("/verifying_account", zodValidation(UserSchema.verifyingAccountDTO), UserController.verifyingAccount);


export default UserRouter;