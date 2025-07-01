import { Router } from "express";
import zodValidation from "../../helpers/zodValidation";
import { UserSchema } from "./User.Schema";
import { UserController } from "./User.controller";


const UserRouter = Router();


UserRouter.post("/", zodValidation(UserSchema.createUserSchema), UserController.createUser);
UserRouter.get("/", UserController.findUser);
UserRouter.get("/:id", UserController.findUserById);
UserRouter.patch("/:id", zodValidation(UserSchema.updateUserSchema), UserController.updateUser);
UserRouter.delete("/:id", UserController.deleteUser)

export default UserRouter;