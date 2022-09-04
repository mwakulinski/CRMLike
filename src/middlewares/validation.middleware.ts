import { NextFunction, Request, Response } from "express";
import Joi from "joi";

function validationMiddleware(schema: Joi.Schema) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
    validationOptions: Joi.ValidationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    }
  ) => {
    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

export default validationMiddleware;
