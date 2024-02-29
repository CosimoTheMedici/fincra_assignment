"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfigs = exports.ErrorConfig = exports.appEnv = void 0;
exports.appEnv = process.env.NODE_ENV;
exports.ErrorConfig = {
    reportStackTrace: exports.appEnv !== 'production',
};
exports.EnvConfigs = {
    jwtKey: process.env.JWT_KEY,
};
//# sourceMappingURL=index.js.map