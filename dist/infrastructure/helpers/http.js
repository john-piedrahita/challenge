"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.unprocessableEntity = exports.unauthorized = exports.badRequest = exports.noContent = exports.ok = void 0;
const errors_1 = require("@/infrastructure/helpers/errors");
const ok = (data) => statusCodeAction(200, "", data);
exports.ok = ok;
const noContent = () => statusCodeAction(204);
exports.noContent = noContent;
const badRequest = (error) => statusCodeAction(400, error);
exports.badRequest = badRequest;
const unauthorized = () => statusCodeAction(401);
exports.unauthorized = unauthorized;
const unprocessableEntity = (error) => statusCodeAction(422, error);
exports.unprocessableEntity = unprocessableEntity;
const serverError = (error) => statusCodeAction(500, error);
exports.serverError = serverError;
function statusCodeAction(status, error, data) {
    switch (status) {
        case 200:
            return { statusCode: 200, body: data };
        case 204:
            return { statusCode: 204, body: "" };
        case 400:
            return { statusCode: 400, body: { "message": error } };
        case 401:
            return { statusCode: 401, body: new errors_1.UnauthorizedError() };
        case 422:
            return { statusCode: 422, body: { "message": error } };
        case 500:
            return { statusCode: 500, body: new errors_1.ServerError(error.stack) };
    }
}
//# sourceMappingURL=http.js.map