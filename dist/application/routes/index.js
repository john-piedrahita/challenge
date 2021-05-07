"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base router "/api/v1"
 * @param router
 */
exports.default = (router) => {
    router.get('/', (req, res) => {
        res.json("Welcome to the world of clean architecture.");
    });
};
//# sourceMappingURL=index.js.map