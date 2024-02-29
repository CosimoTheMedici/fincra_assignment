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
exports.TicketController = void 0;
const services_1 = require("../services");
const ErrorHandlers_1 = require("../utils/errors/ErrorHandlers");
exports.TicketController = {
    createTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = request.body;
                const userId = request.pricipal.id;
                const ticketResponse = yield services_1.ticketService.createTicket(userId, requestBody);
                return response.status(201).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    getAllTickets(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketResponse = yield services_1.ticketService.getAllTickets();
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    getTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = request.params.ticketId;
                const ticketResponse = yield services_1.ticketService.getTicket(ticketId);
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    getUserTickets(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.pricipal.id;
                const ticketResponse = yield services_1.ticketService.getUserTickets(userId);
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    getRecentlyClosedTickets(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticketResponse = yield services_1.ticketService.getRecentlyClosedTickets();
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    comment(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = request.body;
                const userId = request.pricipal.id;
                const userType = request.pricipal.role;
                const ticketResponse = yield services_1.ticketService.comment(userId, requestBody, userType);
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    processTicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.pricipal.id;
                const ticketId = request.params.ticketId;
                const ticketResponse = yield services_1.ticketService.processTicket(userId, ticketId);
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
    closeATicket(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.pricipal.id;
                const ticketId = request.params.ticketId;
                const ticketResponse = yield services_1.ticketService.closeATicket(userId, ticketId);
                return response.status(200).json(ticketResponse);
            }
            catch (error) {
                return (0, ErrorHandlers_1.HandleErrorResponse)(error, response);
            }
        });
    },
};
//# sourceMappingURL=TicketController.js.map