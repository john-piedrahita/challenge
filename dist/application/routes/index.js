"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_router_adapter_1 = require("@/application/config/express-router-adapter");
const base_controller_factory_1 = require("@/infrastructure/entry-points/factories/base-controller-factory");
const constant_1 = require("@/infrastructure/helpers/constant");
/**
 * Base router "/api/v1"
 * @param router
 */
exports.default = (router) => {
    router.get('/', (req, res) => {
        res.json("Welcome to the world of clean architecture.");
    });
    router.post('/account', express_router_adapter_1.adaptRoute(base_controller_factory_1.makeBaseControllerFactory(constant_1.ADD_USER)));
};
//# sourceMappingURL=index.js.map