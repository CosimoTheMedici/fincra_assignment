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
exports.AuthController = void 0;
const services_1 = require("../services");
const ErrorHandlers_1 = require("../utils/errors/ErrorHandlers");
exports.AuthController = {
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = request.body;
                const authResponse = yield services_1.authService.login(requestBody);
                return response.status(200).json(authResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    signup(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = request.body;
                const authResponse = yield services_1.authService.signup(requestBody);
                return response.status(200).json(authResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
};
//# sourceMappingURL=AuthController.js.map