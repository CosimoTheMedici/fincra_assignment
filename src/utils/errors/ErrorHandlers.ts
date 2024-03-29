import { Request, Response } from "express";
import { IError, IErrorData } from "../../interfaces";
import { ErrorCode } from "./ErrorCodes";
import { ErrorLog } from "./ErrorLog";

export class UnauthorizedAccess implements IError {
  code: string;
  message: string;
  data: Error;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.UNAUTHORIZED_ACCESS;
    this.message = error.message || "Unauthorized access";
    this.data = error.data as Error;
  }
}

export class ForbiddenAccess implements IError {
  code: string;
  message: string;
  data: Error;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.FORBIDDEN;
    this.message = error.message || "Not permitted";
    this.data = error.data as Error;
  }
}

export class BadRequest implements IError {
  code: string;
  message: string;
  data: IErrorData;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.BAD_REQUEST;
    this.message = error.message || "missing or invalid.";
    this.data = error.data || {};
  }
}

export class ResourceNotFoundError implements IError {
  code: string;
  message: string;
  data: IErrorData;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.RESOURCE_NOT_FOUND;
    this.message = error.message || "Resource not found";
    this.data = error.data || {};
  }
}

export class ConflictError implements IError {
  code: string;
  message: string;
  data: any;

  constructor(error?: any) {
    this.code = ErrorCode.CONFLICT;
    this.message = error.message || "Duplicated request";
    this.data = error.data;
  }
}

export class ServerError implements IError {
  code: string;
  message: string;
  data: Error;

  constructor(error: Partial<IError>) {
    this.code = ErrorCode.SERVER_ERROR;
    this.message =
      error.message || "An unexpected internal server error occurred";
    this.data = error.data as Error;
  }
}

export class InvalidInputError implements IError {
  code: string;
  message: string;
  data: any;

  constructor(error?: any) {
    this.code = ErrorCode.INVALID_INPUT;
    this.message = error.message || "Invalid Input";
    this.data = error.data;
  }
}

export class TimeOutError implements IError {
  code: string;
  message: string;
  data: any;

  constructor(error?: any) {
    this.code = ErrorCode.TIMEOUT;
    this.message = error.message || "Time out: Took too long";
    this.data = error.data;
  }
}

export class ManyReqError implements IError {
  code: string;
  message: string;
  data: any;

  constructor(error?: any) {
    this.code = ErrorCode.TOO_MANY_REQUESTS;
    this.message = error.message || "Too Many Request For The Same Resource";
    this.data = error.data;
  }
}
export class NoImpError implements IError {
  code: string;
  message: string;
  data: any;

  constructor(error?: any) {
    this.code = ErrorCode.NOT_IMPLEMENTED;
    this.message = error.message || "No Implementation";
    this.data = error.data;
  }
}

export async function unknownRouteError(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(404).json(<IError>{
    code: "ROUTE_NOT_FOUND",
    message: "Route not found.",
    data: {},
  });
}

export const HandleErrorResponse = (err: any, res: Response): Response => {
  switch (err.code) {
    case ErrorCode.BAD_REQUEST:
      return res.status(400).json(new BadRequest(err));
    case ErrorCode.UNAUTHORIZED_ACCESS:
      return res.status(401).json(new UnauthorizedAccess(err));
    case ErrorCode.FORBIDDEN:
      return res.status(403).json(new ForbiddenAccess(err));
    case ErrorCode.RESOURCE_NOT_FOUND:
      return res.status(404).json(new ResourceNotFoundError(err));
    case ErrorCode.TIMEOUT:
      return res.status(408).json(new TimeOutError(err));
    case ErrorCode.CONFLICT:
      return res.status(409).json(new ConflictError(err));
    case ErrorCode.TOO_MANY_REQUESTS:
      return res.status(429).json(new ManyReqError(err));
    case ErrorCode.NOT_IMPLEMENTED:
      return res.status(501).json(new ManyReqError(err));
    default: {
      ErrorLog.log(err);
      return res.status(500).json(new ServerError(err));
    }
  }
};
