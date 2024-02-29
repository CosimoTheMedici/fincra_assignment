"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validator_1 = require("../middlewares/Validator");
const Users_1 = require("../validators/Users");
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
router.post('/login', Validator_1.Validator.validate(Users_1.loginValidator), AuthController_1.AuthController.login);
router.post('/signup', Validator_1.Validator.validate(Users_1.signupValidator), AuthController_1.AuthController.signup);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map