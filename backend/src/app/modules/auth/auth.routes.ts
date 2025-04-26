import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
 "/register",
 validateRequest(authValidations.userRegisterSchemaValidation),
 AuthController.registerUser,
);

router.post(
 "/login",
 validateRequest(authValidations.userLoginValidation),
 AuthController.loginUser,
);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword); 
export const authRoutes = router;
