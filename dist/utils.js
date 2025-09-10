"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWO_PI = void 0;
exports.multiply = multiply;
exports.add = add;
exports.subtract = subtract;
exports.exponential = exponential;
exports.conjugate = conjugate;
exports.TWO_PI = 2 * Math.PI;
// complex multiplication
function multiply(a, b) {
    return [
        a[0] * b[0] - a[1] * b[1],
        a[0] * b[1] + a[1] * b[0]
    ];
}
// complex addition
function add(a, b) {
    return [
        a[0] + b[0],
        a[1] + b[1]
    ];
}
// complex subtraction
function subtract(a, b) {
    return [
        a[0] - b[0],
        a[1] - b[1]
    ];
}
// euler's identity e^(j*x) = cos(x) + j*sin(x)
// and e^(-j*x) = cos(x) - j*sin(x)
// for x >= 0
function exponential(theta) {
    if (theta >= 0) {
        return [Math.cos(theta), Math.sin(theta)];
    }
    else {
        return [Math.cos(Math.abs(theta)), -Math.sin(Math.abs(theta))];
    }
}
// complex conjugate
function conjugate(a) {
    return [a[0], -a[1]];
}
