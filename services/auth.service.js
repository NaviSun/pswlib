import { ACCESS_TOKEN_SECRET, COOKIE_NAME } from "../config/index.js";
import { verifyToken } from "../utils/token.js";
import { readFileSync } from "fs";

const PRIVATE_KEY = readFileSync("./config/private_key.pem", "utf8");

export const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
   return res.sendStatus(403);
  }
  try {
    const data = verifyToken(token, ACCESS_TOKEN_SECRET);
    req.userId = data.id;
    req.role = data.role;
    return next();
  } catch {
    res.sendStatus(403);
  }
};

export const logout = (req, res) => {
  return res
    .clearCookie(COOKIE_NAME)
    .redirect(303, '/');
};
