import { Router } from "express";
import userController from "../controllers/user.controller";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "../dtos/user.dto";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";

const userRouter = Router();

userRouter.post(
  "/create",
  [validationMiddleware(CreateUserDTO)],
  userController.createUser
);
userRouter.put(
  "/update",
  [checkLoggedIn, validationMiddleware(UpdateUserDTO)],
  userController.updateUser
);
userRouter.get("/me", [checkLoggedIn], userController.me);
userRouter.get("/all", [checkAdmin], userController.all);
userRouter.get("/:id", [], userController.getById);
userRouter.delete("/me", [checkLoggedIn], userController.deleteUser);

export default userRouter;
