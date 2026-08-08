import {
  NextFunction,
  Request,
  Response,
} from "express";

export const notFound = (
  req: Request,
  res: Response
) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};