"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ErrorHandlers_1 = require("../utils/errors/ErrorHandlers");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const ticketRoutes_1 = __importDefault(require("./ticketRoutes"));
const router = express_1.default.Router();
router.use('/health', (req, res) => {
    res.send({ status: 'OK' });
});
router.use('/auth', authRoutes_1.default);
router.use('/ticket', ticketRoutes_1.default);
router.use(ErrorHandlers_1.unknownRouteError);
exports.default = router;
//# sourceMappingURL=index.js.map