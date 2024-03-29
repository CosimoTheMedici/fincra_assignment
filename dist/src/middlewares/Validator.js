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
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
const ErrorHandlers_1 = require("../utils/errors/ErrorHandlers");
exports.Validator = {
    validate: (validations) => {
        return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.all(validations.map((validation) => validation.run(req)));
            const errors = (0, express_validator_1.validationResult)(req);
            if (errors.isEmpty())
                return next();
            return res.status(400).json(new ErrorHandlers_1.BadRequest({
                data: errors.array().map(({ param, msg }) => ({
                    param,
                    message: msg,
                })),
            }));
        });
    },
};
//# sourceMappingURL=Validator.js.map