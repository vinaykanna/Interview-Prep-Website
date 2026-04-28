"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sluggify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
        .replace(/-{2,}/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
exports.default = sluggify;
//# sourceMappingURL=sluggify.js.map