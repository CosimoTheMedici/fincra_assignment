"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validator_1 = require("../middlewares/Validator");
const Tickets_1 = require("../validators/Tickets");
const TicketController_1 = require("../controllers/TicketController");
const Security_1 = require("../middlewares/Security");
const UserType_1 = require("../interfaces/UserType");
const router = express_1.default.Router();
router.get("/", Security_1.Security.isAuthUser([UserType_1.UserType.USER]), TicketController_1.TicketController.getUserTickets);
router.get("/all/", Security_1.Security.isAuthUser([UserType_1.UserType.AGENT, UserType_1.UserType.ADMIN]), TicketController_1.TicketController.getAllTickets);
router.get("/id/:ticketId", Security_1.Security.isAuthUser([UserType_1.UserType.USER, UserType_1.UserType.AGENT, UserType_1.UserType.ADMIN]), TicketController_1.TicketController.getTicket);
router.get("/recently-closed/", Security_1.Security.isAuthUser([UserType_1.UserType.AGENT, UserType_1.UserType.ADMIN]), TicketController_1.TicketController.getRecentlyClosedTickets);
router.post("/process/:ticketId", Security_1.Security.isAuthUser([UserType_1.UserType.AGENT]), TicketController_1.TicketController.processTicket);
router.post("/close/:ticketId", Security_1.Security.isAuthUser([UserType_1.UserType.AGENT, UserType_1.UserType.ADMIN]), TicketController_1.TicketController.closeATicket);
router.post("/", Security_1.Security.isAuthUser([UserType_1.UserType.USER]), Validator_1.Validator.validate(Tickets_1.createTicketValidator), TicketController_1.TicketController.createTicket);
router.post("/comment", Security_1.Security.isAuthUser([UserType_1.UserType.USER, UserType_1.UserType.AGENT, UserType_1.UserType.ADMIN]), Validator_1.Validator.validate(Tickets_1.commentValidator), TicketController_1.TicketController.comment);
exports.default = router;
//# sourceMappingURL=ticketRoutes.js.map