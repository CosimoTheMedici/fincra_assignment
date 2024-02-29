"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLog = void 0;
const Logger_1 = require("../Logger");
exports.ErrorLog = {
    log(err) {
        if (process.env.NODE_ENV !== "test") {
            "string" === typeof err
                ? Logger_1.Logger.Error("SERVER_ERROR: ", err)
                : Logger_1.Logger.Error("SERVER_ERROR: ", err.message, err.stack);
        }
    },
};
//# sourceMappingURL=ErrorLog.js.map