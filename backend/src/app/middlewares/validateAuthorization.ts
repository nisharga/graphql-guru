import { NextFunction, Request, Response } from "express";
import ApiError from "./apiError";
import httpStatus from "http-status";

interface CustomRequest extends Request {
 role?: string;
}

const validateAuthorization = (allowedRoles: string[]): any => {
 return async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    console.log(req.role)
   const currentRole = req.role;
   if (
    allowedRoles.length &&
    currentRole &&
    !allowedRoles.includes(currentRole)
   ) {
    throw new ApiError(
     httpStatus.FORBIDDEN,
     "You are not allowed to perform this action",
    );
   }
   next();
  } catch (error) {
   next(error);
  }
 };
};

export default validateAuthorization;
