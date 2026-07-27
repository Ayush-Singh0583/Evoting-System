// routes/index.js
import express from "express";
import { adminProtect } from "../middleware/adminProtect.js";
import adminAuthRoutes from "./adminAuth.js";

const router = express.Router();

/**
 *  PUBLIC ROUTES (NO AUTH)
 */
router.use("/admin", adminAuthRoutes);
// router.use("/testing", testingRoutes);


/**
 * 🔐 APPLY ADMIN PROTECTION TO EVERYTHING BELOW
 */
router.use(adminProtect);

/**
 * 🔒 PROTECTED ROUTES
 */
// router.use("/semesters", semesterRoutes);
// router.use("/branches", branchRoutes);


/**
 * (optional) Testing — remove in prod
 */

export default router;