"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log4js = void 0;
const log4js_1 = __importDefault(require("log4js"));
class Log4js {
    constructor(options) {
        log4js_1.default.configure({
            appenders: {
                [options.id]: { type: "console", layout: { type: "colored" } },
            },
            categories: {
                default: { appenders: [options.id], level: options.level || "error" },
            },
        });
        this.logger = log4js_1.default.getLogger(options.id);
    }
    Info(...info) {
        this.logger.info(info);
    }
    Error(...error) {
        this.logger.error(error);
    }
    Warn(...message) {
        this.logger.warn(message);
    }
}
exports.Log4js = Log4js;
//# sourceMappingURL=Log4js.js.map