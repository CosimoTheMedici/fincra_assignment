"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const LoggerFactory_1 = require("./LoggerFactory");
const Logger = LoggerFactory_1.LoggerFactory.configure({
    id: "fincra-test",
    level: "all",
});
exports.Logger = Logger;
//# sourceMappingURL=index.js.map