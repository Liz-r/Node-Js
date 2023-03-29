import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

const verifiedToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.header('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }
    jwt.verify(token, config.secrets.token);
    next();
  } catch (e) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
}

export default { verifiedToken };