import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.path === "/users/login" || req.path === "/users/register") {
    next();
    return;
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid token." });
      return;
    }
    req.user = decoded;
    next();
  });
};
