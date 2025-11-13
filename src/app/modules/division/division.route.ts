import { Router } from "express";
import { divisionController } from "./division.contoraller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middlewares/zodValidation";
import { createDivisionSchema, updateDivisionSchema } from "./division.validation";


const router =Router()

router.post("/create",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validationRequest(createDivisionSchema),divisionController.createDivision)
router.get("/",divisionController.getAllDivision)
router.get("/:slug",divisionController.getSingleDivision)
router.patch("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validationRequest(updateDivisionSchema),divisionController.updateDivision)
router.delete("/:id",divisionController.deleteDivision)

export const divisionRoutes= router