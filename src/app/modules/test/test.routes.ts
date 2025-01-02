import express from "express";

import { companyController } from "./test.controllers";

const router = express.Router();

router.get("/company", companyController.companyCheck);

export const testRoutes = router;
