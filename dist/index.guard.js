"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConvention = isConvention;
function isConvention(obj) {
    const typedObj = obj;
    return ((typedObj === "orthogonal_unitary" ||
        typedObj === "unnormalized_forward"));
}
