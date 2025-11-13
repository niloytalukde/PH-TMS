import {  Router } from "express";
import { userController } from "./user.controller";
import { validationRequest } from "../../middlewares/zodValidation";
import { userSchema } from "./user.validition";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";





const router = Router();

router.post("/register",validationRequest(userSchema),userController.createUser);
router.get("/all-users",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),userController.getAllUsers);
router.patch(":id",checkAuth(...Object.values(Role)),userController.newUpdatedUser)
export const userRoutes = router;
