import { Router } from "express";
import { emailController } from "./Email.controller";
import zodValidation from "../../helpers/zodValidation";
import { emailSchema } from "./Email.schema";

const EmailRouter = Router();

EmailRouter.get("/", emailController.getMail);
EmailRouter.post("/", zodValidation(emailSchema.emailCreateSchema), emailController.sentEmail);

export default EmailRouter;