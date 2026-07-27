import express from "express";
import {
  adminLogin,
  refreshAdminToken,
  adminLogout
} from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/refresh", refreshAdminToken);
router.post("/logout", adminLogout);

export default router;