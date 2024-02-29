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
exports.authService = void 0;
const config_1 = require("../config");
const ErrorHandlers_1 = require("../utils/errors/ErrorHandlers");
const UserService_1 = require("./UserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserType_1 = require("../interfaces/UserType");
exports.authService = {
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield UserService_1.userService.findUserByEmail(user.email);
            if (!existingUser) {
                throw new ErrorHandlers_1.UnauthorizedAccess({ message: "Invalid email/password" });
            }
            const correctPassword = yield bcryptjs_1.default.compare(user.password, existingUser.password);
            if (!correctPassword) {
                throw new ErrorHandlers_1.UnauthorizedAccess({ message: "Invalid email/password" });
            }
            const payload = {
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.userType,
            };
            const token = jsonwebtoken_1.default.sign(payload, config_1.EnvConfigs.jwtKey);
            return Promise.resolve({
                id: existingUser._id,
                name: existingUser.name,
                token,
                email: existingUser.email,
                userType: existingUser.userType,
            });
        });
    },
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield UserService_1.userService.findUserByEmail(user.email);
            if (existingUser) {
                throw new ErrorHandlers_1.BadRequest({ message: "User already exists, go to login" });
            }
            user.userType = UserType_1.UserType.USER;
            const createdUser = yield UserService_1.userService.createUser(user);
            const payload = {
                id: createdUser._id,
                email: createdUser.email,
                role: createdUser.userType,
            };
            const token = jsonwebtoken_1.default.sign(payload, config_1.EnvConfigs.jwtKey);
            return Promise.resolve({
                id: createdUser._id,
                name: createdUser.name,
                token,
                email: createdUser.email,
                userType: createdUser.userType,
            });
        });
    },
};
//# sourceMappingURL=AuthService.js.map