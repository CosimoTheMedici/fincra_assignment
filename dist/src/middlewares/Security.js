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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Security = exports.transformResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
class TokenSecurity {
    static config() {
        return new TokenSecurity();
    }
    extractAuthToken(req) {
        if (req.headers.authorization) {
            if (/^bearer/i.test(req.headers.authorization)) {
                return req.headers.authorization.split(/\s+/)[1];
            }
        }
        return '';
    }
    isAuthUser(userTypes) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = this.extractAuthToken(req);
            // No API token provided
            if (!token) {
                res.status(401).json(exports.transformResponse === null || exports.transformResponse === void 0 ? void 0 : (0, exports.transformResponse)(401, 'Invalid authorization provided'));
                return;
            }
            try {
                const verified = yield jsonwebtoken_1.default.verify(token, config_1.EnvConfigs.jwtKey);
                if (verified) {
                    req.pricipal = verified;
                    req.token = token;
                }
            }
            catch (err) {
                res.status(401).json(exports.transformResponse === null || exports.transformResponse === void 0 ? void 0 : (0, exports.transformResponse)(401, 'Invalid authorization provided'));
                return;
            }
            if (!userTypes.includes(req.pricipal.role)) {
                res.status(401).json(exports.transformResponse === null || exports.transformResponse === void 0 ? void 0 : (0, exports.transformResponse)(403, 'User does not have permission'));
                return;
            }
            next();
        });
    }
}
const transformResponse = (code, message) => {
    const data = {};
    if (code === 401) {
        data.code = 'TOKEN_MISSING';
    }
    else if (code === 403) {
        data.code = 'ACCESS_DENIED';
    }
    else {
        data.code = 'SERVER_ERROR';
    }
    if (message instanceof Error) {
        data.message = message.message;
    }
    else if (typeof message === 'string') {
        data.message = message;
    }
    else {
        data.message = 'Unable to verify request';
    }
    if (typeof message === 'object' && message.data) {
        data.data = message.data;
    }
    return data;
};
exports.transformResponse = transformResponse;
exports.Security = TokenSecurity.config();
exports.default = TokenSecurity;
//# sourceMappingURL=Security.js.map