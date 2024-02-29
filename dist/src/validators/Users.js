"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)("email", "User email")
        .isLength({
        min: 4,
        max: 100,
    })
        .exists()
        .isEmail()
        .trim()
        .escape(),
    (0, express_validator_1.body)("password", "User password")
        .isLength({
        min: 7,
        max: 100,
    })
        .exists()
        .trim()
        .escape(),
];
exports.signupValidator = [
    (0, express_validator_1.body)("name", "User name")
        .isLength({
        min: 4,
        max: 100,
    })
        .exists()
        .trim()
        .escape(),
    (0, express_validator_1.body)("email", "User email")
        .isLength({
        min: 4,
        max: 100,
    })
        .exists()
        .isEmail()
        .trim()
        .escape(),
    (0, express_validator_1.body)("password", "User password")
        .isLength({
        min: 7,
        max: 100,
    })
        .exists()
        .trim()
        .escape(),
];
//# sourceMappingURL=Users.js.map