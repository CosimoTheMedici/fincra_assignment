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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("../../app"));
const Logger_1 = require("../../utils/Logger");
const mongoose_1 = __importDefault(require("mongoose"));
const seedConfig_1 = require("../../seed-config/seedConfig");
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.connect(`${process.env.MONGODB_URI}`, { autoCreate: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        Logger_1.Logger.Info('DB Connected successfully!');
        (0, seedConfig_1.seedBaseData)().then(() => {
            // Start express server
            app_1.default.listen(process.env.PORT || 3000, () => {
                const port = app_1.default.get('port');
                Logger_1.Logger.Info(`Application Started at http://localhost:${port}`);
            });
        }).catch(error => {
            Logger_1.Logger.Error('DB Seeding not successful  : ', error);
        });
    })).catch(error => Logger_1.Logger.Error('MongoDB did not Connect :' + error));
}))();
//# sourceMappingURL=index.js.map