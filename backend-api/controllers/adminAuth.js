import speakeasy from "speakeasy";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokens.js";

const isDev = process.env.NODE_ENV !== "production";

// SINGLE ADMIN refresh token (memory)
// ⚠️ In multi-instance prod → move to Redis
let activeRefreshToken = null;

/* LOGIN */
export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);
  console.log("admin username:", process.env.ADMIN_USERNAME);

  // 1️⃣ Username check
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 2️⃣ TOTP verification
  const verified = speakeasy.totp.verify({
    secret: process.env.TOTP_SECRET,
    encoding: "base32",
    token: password,
    window: 1,
  });

  if (!verified) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3️⃣ Tokens
  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken();

  activeRefreshToken = refreshToken;

  // 4️⃣ HttpOnly refresh cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDev,               // true in prod (HTTPS)
    sameSite: isDev ? "lax" : "none",
    path: "/api/admin/refresh",
  });

  return res.json({ accessToken });
};

/* REFRESH */
export const refreshAdminToken = (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token || token !== activeRefreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken();
    res.json({ accessToken });
  });
};

// POST /api/admin/logout
export const adminLogout = (req, res) => {
  activeRefreshToken = null;

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: !isDev,
    sameSite: isDev ? "lax" : "none",
    path: "/api/admin/refresh",
  });

  res.json({ message: "Logged out" });
};