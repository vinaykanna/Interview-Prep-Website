"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHeaders(headers) {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        // "Content-Type": "application/json",
        ...(headers || {}),
    };
}
exports.default = getHeaders;
//# sourceMappingURL=getHeaders.js.map