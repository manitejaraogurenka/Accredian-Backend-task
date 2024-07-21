import { Router } from "express";
import { createReferral } from "../controllers/referralController.js";

const router = Router();

router.post("/api/referral", createReferral);

export default router;
