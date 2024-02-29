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
exports.createBaseUsers = void 0;
const seedUsers_json_1 = __importDefault(require("../../seeds/seedUsers.json"));
const services_1 = require("../services");
const user_Json = seedUsers_json_1.default;
function createBaseUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = user_Json.users;
        if (!Array.isArray(users)) {
            return;
        }
        for (const user of users) {
            const userInDB = yield services_1.userService.findUserByEmail(user.email);
            if (!userInDB) {
                yield services_1.userService.createUser(user);
            }
        }
    });
}
exports.createBaseUsers = createBaseUsers;
//# sourceMappingURL=seedUser.js.map