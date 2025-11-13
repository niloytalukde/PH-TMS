import { Router } from "express";
import { tourController } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validationRequest } from "../../middlewares/zodValidation";
import { tourZodSchema } from "./tour.validation";

const router = Router()

router.post("/create-tour-type",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourController.createTourType)
router.get("/tour-types",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourController.getAllTourTypes)
router.patch("/tour-types/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourController.updateTourTypes)
router.delete("/tour-types/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourController.deleteTourTypes)

// Tour Api Route 
router.post("/create",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validationRequest(tourZodSchema),tourController.createTour)


router.patch("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validationRequest(tourZodSchema),tourController.updateTourTypes)
router.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourController.deleteTourTypes)

export const tourRoutes =router