"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const Log4js_1 = require("./Log4js");
// Wrapper for Log4js
class LoggerFactory {
    constructor(options) {
        this.options = options;
        this.logger = new Log4js_1.Log4js(options);
    }
    static configure(options) {
        return new LoggerFactory(options).logger;
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map