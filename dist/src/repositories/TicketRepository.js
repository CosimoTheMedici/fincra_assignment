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
exports.ticketRepository = void 0;
const Ticket_1 = require("../entities/Ticket");
const TicketStatus_1 = require("../interfaces/TicketStatus");
exports.ticketRepository = {
    getAllTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.find();
        });
    },
    getUserTickets(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.find({ userId });
        });
    },
    createTicket(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Ticket_1.Ticket(data).save();
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.findOne({ _id: id });
        });
    },
    getRecentlyClosedTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.find({
                status: TicketStatus_1.TicketStatus.COMPLETED,
                completedDate: {
                    $lte: new Date(),
                    $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                },
            });
        });
    },
    addComment(content, userId, ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.findByIdAndUpdate(ticket._id, {
                $push: {
                    comments: {
                        content,
                        userId,
                    },
                },
            });
        });
    },
    processTicket(userId, ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.findByIdAndUpdate(ticket._id, {
                $set: {
                    startedDate: new Date(),
                    status: TicketStatus_1.TicketStatus.IN_PROGRESS,
                    agentId: userId,
                },
            });
        });
    },
    closeATicket(userId, ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Ticket_1.Ticket.findByIdAndUpdate(ticket._id, {
                $set: {
                    completedDate: new Date(),
                    status: TicketStatus_1.TicketStatus.COMPLETED,
                },
            });
        });
    },
};
//# sourceMappingURL=TicketRepository.js.map