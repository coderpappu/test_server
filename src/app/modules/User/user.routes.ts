import express from "express";
import authMiddleware from "../../middleware/authMiddleware";
import validateRequest from "../../middleware/validateRequest";
import { companyController } from "../Company/company.controllers";
import { userController } from "./user.controllers";
import UserValidationSchema from "./user.validation";

const router = express.Router();

// get user data
router.get(
  "/getuser",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  userController.getUser
);
router.get(
  "/getcompany",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  companyController.getCompany
);

router.get(
  "/getuser",

  userController.getUser
);

router.get(
  "/getusers",
  // authMiddleware("SUPER_ADMIN", "ADMIN"),
  userController.getUsers
);

router.get(
  "/getuser/details/:id",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  userController.getUserDetails
);

// login user
router.post("/login", userController.loginUser);
// user add route
router.post(
  "/create",
  validateRequest(UserValidationSchema),
  userController.createUser
);

router.put(
  "/update/password",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  userController.updatePassword
);

// update user
router.put(
  "/update/:id",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  userController.updateUser
);

// delete user account
router.delete(
  "/deleteuser/:id",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  userController.deleteUser
);

export const userRoutes = router;
