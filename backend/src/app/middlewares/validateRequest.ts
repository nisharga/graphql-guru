import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction): any => {
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next();
    }
    catch (err) {
        next(err)
    }
};

export default validateRequest;