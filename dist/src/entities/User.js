"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserType_1 = require("../interfaces/UserType");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userType: {
        type: String,
        index: false,
        enum: Object.values(UserType_1.UserType),
        required: true
    },
    password: {
        type: String,
        index: false,
        required: true
    }
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    if (this.password) {
        this.password = bcryptjs_1.default.hashSync(this.password, saltRounds);
        next();
    }
    else {
        next();
    }
});
const User = mongoose_1.default.model('user', userSchema);
exports.User = User;
//# sourceMappingURL=User.js.map