"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_helper_1 = require("@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper");
const environment_1 = require("@/application/config/environment");
if (fs_1.default.existsSync(".env"))
    dotenv_1.default.config({ path: ".env" });
mongo_helper_1.MongoHelper.connect(environment_1.MONGODB_URI).then(async () => {
    console.log("Connected mongoDB");
    const app = (await Promise.resolve().then(() => __importStar(require('./config/app')))).default;
    app.listen(environment_1.PORT, () => console.log("Server an running on port: " + environment_1.PORT));
}).catch(err => console.log(err));
//# sourceMappingURL=server.js.map