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
exports.ticketService = void 0;
const TicketRepository_1 = require("../repositories/TicketRepository");
const TicketStatus_1 = require("../interfaces/TicketStatus");
const ErrorHandlers_1 = require("../utils/errors/ErrorHandlers");
const UserType_1 = require("../interfaces/UserType");
exports.ticketService = {
    createTicket(userId, ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdTicket = yield TicketRepository_1.ticketRepository.createTicket({
                title: ticket.title,
                decription: ticket.description,
                status: TicketStatus_1.TicketStatus.CREATED,
                creatorId: userId,
            });
            return Promise.resolve(createdTicket);
        });
    },
    comment(userId, comment, userType) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let ticket = yield TicketRepository_1.ticketRepository.findById(comment.ticketId);
            if (!ticket) {
                throw new ErrorHandlers_1.ResourceNotFoundError({ message: "Ticket not found" });
            }
            if (userType === UserType_1.UserType.USER &&
                (!ticket.comments || ((_a = ticket.comments) === null || _a === void 0 ? void 0 : _a.length) < 1)) {
                throw new ErrorHandlers_1.BadRequest({ message: "No agent has commented on the ticket" });
            }
            ticket = yield TicketRepository_1.ticketRepository.addComment(comment.content, userId, ticket);
            return Promise.resolve(ticket);
        });
    },
    getUserTickets(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield TicketRepository_1.ticketRepository.getUserTickets(userId);
            return Promise.resolve(tickets);
        });
    },
    getAllTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield TicketRepository_1.ticketRepository.getAllTickets();
            return Promise.resolve(tickets);
        });
    },
    getRecentlyClosedTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield TicketRepository_1.ticketRepository.getRecentlyClosedTickets();
            return Promise.resolve(tickets);
        });
    },
    getTicket(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield TicketRepository_1.ticketRepository.findById(ticketId);
            if (!ticket) {
                throw new ErrorHandlers_1.ResourceNotFoundError({ message: "Ticket not found" });
            }
            return Promise.resolve(ticket);
        });
    },
    processTicket(userId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield TicketRepository_1.ticketRepository.findById(ticketId);
            if (!ticket) {
                throw new ErrorHandlers_1.ResourceNotFoundError({ message: "Ticket not found" });
            }
            if (ticket.status !== TicketStatus_1.TicketStatus.CREATED) {
                throw new ErrorHandlers_1.BadRequest({
                    message: "Cannot process ticket with this status",
                });
            }
            yield TicketRepository_1.ticketRepository.processTicket(userId, ticket);
            return Promise.resolve({ successful: true, message: "Processing ticket" });
        });
    },
    closeATicket(userId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield TicketRepository_1.ticketRepository.findById(ticketId);
            if (!ticket) {
                throw new ErrorHandlers_1.ResourceNotFoundError({ message: "Ticket not found" });
            }
            if (ticket.status !== TicketStatus_1.TicketStatus.IN_PROGRESS) {
                throw new ErrorHandlers_1.BadRequest({ message: "Cannot close ticket with this status" });
            }
            yield TicketRepository_1.ticketRepository.closeATicket(userId, ticket);
            return Promise.resolve({ successful: true, message: "Closed ticket" });
        });
    },
};
//# sourceMappingURL=TicketService.js.map