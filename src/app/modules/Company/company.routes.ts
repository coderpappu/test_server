import express from "express";

import authMiddleware from "../../middleware/authMiddleware";
import validateRequest from "../../middleware/validateRequest";
import { companyController } from "./company.controllers";
import companyValidationSchema from "./company.validation";

const router = express.Router();

// all company get
router.get("/getcompany", companyController.getCompany);

// authMiddleware("SUPER_ADMIN", "ADMIN"),
router.get("/company", companyController.companyCheck);
// specific company details get
router.get(
  "/getcompanydetails/:id",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  companyController.getCompanyDetails
);

// create company
router.post(
  "/createcompany",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  validateRequest(companyValidationSchema),
  companyController.createCompany
);

// company details update
router.put(
  "/updatecompany/:id",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  validateRequest(companyValidationSchema),
  companyController.updateCompany
);

// company delete
router.delete(
  "/deletecompany/:id",
  authMiddleware("SUPER_ADMIN", "ADMIN"),
  companyController.deleteCompany
);

export const companyRoutes = router;
