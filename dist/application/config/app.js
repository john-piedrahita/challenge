"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("@/application/config/routes"));
const middlewares_1 = __importDefault(require("@/application/config/middlewares"));
const app = express_1.default();
middlewares_1.default(app);
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map