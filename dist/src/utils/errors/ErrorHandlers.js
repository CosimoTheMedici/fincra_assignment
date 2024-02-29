"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrorResponse = exports.unknownRouteError = exports.NoImpError = exports.ManyReqError = exports.TimeOutError = exports.InvalidInputError = exports.ServerError = exports.ConflictError = exports.ResourceNotFoundError = exports.BadRequest = exports.ForbiddenAccess = exports.UnauthorizedAccess = void 0;
const ErrorCodes_1 = require("./ErrorCodes");
const ErrorLog_1 = require("./ErrorLog");
class UnauthorizedAccess {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.UNAUTHORIZED_ACCESS;
        this.message = error.message || "Unauthorized access";
        this.data = error.data;
    }
}
exports.UnauthorizedAccess = UnauthorizedAccess;
class ForbiddenAccess {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.FORBIDDEN;
        this.message = error.message || "Not permitted";
        this.data = error.data;
    }
}
exports.ForbiddenAccess = ForbiddenAccess;
class BadRequest {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.BAD_REQUEST;
        this.message = error.message || "missing or invalid.";
        this.data = error.data || {};
    }
}
exports.BadRequest = BadRequest;
class ResourceNotFoundError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.RESOURCE_NOT_FOUND;
        this.message = error.message || "Resource not found";
        this.data = error.data || {};
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class ConflictError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.CONFLICT;
        this.message = error.message || "Duplicated request";
        this.data = error.data;
    }
}
exports.ConflictError = ConflictError;
class ServerError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.SERVER_ERROR;
        this.message =
            error.message || "An unexpected internal server error occurred";
        this.data = error.data;
    }
}
exports.ServerError = ServerError;
class InvalidInputError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.INVALID_INPUT;
        this.message = error.message || "Invalid Input";
        this.data = error.data;
    }
}
exports.InvalidInputError = InvalidInputError;
class TimeOutError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.TIMEOUT;
        this.message = error.message || "Time out: Took too long";
        this.data = error.data;
    }
}
exports.TimeOutError = TimeOutError;
class ManyReqError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.TOO_MANY_REQUESTS;
        this.message = error.message || "Too Many Request For The Same Resource";
        this.data = error.data;
    }
}
exports.ManyReqError = ManyReqError;
class NoImpError {
    constructor(error) {
        this.code = ErrorCodes_1.ErrorCode.NOT_IMPLEMENTED;
        this.message = error.message || "No Implementation";
        this.data = error.data;
    }
}
exports.NoImpError = NoImpError;
function unknownRouteError(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(404).json({
            code: "ROUTE_NOT_FOUND",
            message: "Route not found.",
            data: {},
        });
    });
}
exports.unknownRouteError = unknownRouteError;
const HandleErrorResponse = (err, res) => {
    switch (err.code) {
        case ErrorCodes_1.ErrorCode.BAD_REQUEST:
            return res.status(400).json(new BadRequest(err));
        case ErrorCodes_1.ErrorCode.UNAUTHORIZED_ACCESS:
            return res.status(401).json(new UnauthorizedAccess(err));
        case ErrorCodes_1.ErrorCode.FORBIDDEN:
            return res.status(403).json(new ForbiddenAccess(err));
        case ErrorCodes_1.ErrorCode.RESOURCE_NOT_FOUND:
            return res.status(404).json(new ResourceNotFoundError(err));
        case ErrorCodes_1.ErrorCode.TIMEOUT:
            return res.status(408).json(new TimeOutError(err));
        case ErrorCodes_1.ErrorCode.CONFLICT:
            return res.status(409).json(new ConflictError(err));
        case ErrorCodes_1.ErrorCode.TOO_MANY_REQUESTS:
            return res.status(429).json(new ManyReqError(err));
        case ErrorCodes_1.ErrorCode.NOT_IMPLEMENTED:
            return res.status(501).json(new ManyReqError(err));
        default: {
            ErrorLog_1.ErrorLog.log(err);
            return res.status(500).json(new ServerError(err));
        }
    }
};
exports.HandleErrorResponse = HandleErrorResponse;
//# sourceMappingURL=ErrorHandlers.js.map