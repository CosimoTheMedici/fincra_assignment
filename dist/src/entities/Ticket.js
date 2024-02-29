"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TicketStatus_1 = require("../interfaces/TicketStatus");
const ticketSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        index: true,
        required: true
    },
    decription: {
        type: String,
        index: false,
        required: true
    },
    status: {
        type: String,
        index: false,
        enum: Object.values(TicketStatus_1.TicketStatus),
        required: true
    },
    startedDate: {
        type: Date,
    },
    completedDate: {
        type: Date,
    },
    creatorId: {
        type: String,
        index: false,
        required: true
    },
    agentId: {
        type: String,
        index: false,
        required: false
    },
    comments: [
        {
            content: {
                type: String,
                index: false,
                required: true
            },
            userId: {
                type: String,
                index: false,
                required: true
            }
        },
        {
            timestamps: true,
        }
    ]
}, {
    timestamps: true,
});
const Ticket = mongoose_1.default.model('ticket', ticketSchema);
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map