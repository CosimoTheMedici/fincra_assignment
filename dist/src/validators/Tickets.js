"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidator = exports.createTicketValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createTicketValidator = [
    (0, express_validator_1.body)("title", "title of ticket")
        .isLength({
        min: 1,
        max: 100,
    })
        .exists()
        .trim()
        .escape(),
    (0, express_validator_1.body)("description", "Description of ticket")
        .isLength({
        min: 2,
        max: 2000,
    })
        .exists()
        .trim()
        .escape(),
];
exports.commentValidator = [
    (0, express_validator_1.body)("content", "Content of comment")
        .isLength({
        min: 1,
        max: 2000,
    })
        .exists()
        .trim()
        .escape(),
    (0, express_validator_1.body)("ticketId", "Id of ticket")
        .isLength({
        min: 2,
        max: 100,
    })
        .exists()
        .trim()
        .escape(),
];
//# sourceMappingURL=Tickets.js.map