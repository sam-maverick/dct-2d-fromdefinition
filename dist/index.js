"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dct = dct;
exports.idct = idct;
const utils_1 = require("./utils");
const guards = require("./index.guard");
function C(a, D, convention) {
    switch (convention) {
        case 'orthogonal_unitary':
            if (a === 0) {
                return Math.sqrt(1 / D);
            }
            else {
                return Math.sqrt(2 / D);
            }
        case 'unnormalized_forward':
            if (a === 0) {
                return 1 / 2;
            }
            else {
                return 1;
            }
        default:
            return 0;
    }
    ;
}
/**
 * This function calculates the 2D-DCT of a real or imaginary signal, from the definition of the DCT.
 * @param signal Array of values of the 2D signal in the spacial domain, in cartesian format:
 * signal[][][0] is the real part and signal[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., signal[x].length is always the same.
 * @returns The DCT of signal, in the same format.
 */
function dct(signal, convention) {
    if (!guards.isConvention(convention)) {
        throw new Error('Invalid convention.');
    }
    const M = signal.length;
    const N = signal[0].length;
    let norm_factor_outer = 1;
    let transform = Array.from({ length: M }, () => {
        return Array.from({ length: N }, () => {
            return [0, 0];
        });
    });
    for (let u = 0; u < M; u++) {
        for (let v = 0; v < N; v++) {
            switch (convention) {
                case 'orthogonal_unitary':
                    norm_factor_outer = C(u, M, convention) * C(v, N, convention);
                    break;
                case 'unnormalized_forward':
                    break;
            }
            ;
            let sum = [0, 0];
            for (let x = 0; x < M; x++) {
                for (let y = 0; y < N; y++) {
                    sum = (0, utils_1.add)(sum, (0, utils_1.multiply)(signal[x][y], [Math.cos(u * Math.PI * (x + 0.5) / M) * Math.cos(v * Math.PI * (y + 0.5) / N), 0]));
                }
            }
            transform[u][v] = (0, utils_1.multiply)([norm_factor_outer, 0], sum);
        }
    }
    return transform;
}
/**
 * This function calculates the inverse 2D-DCT, from the definition of the inverse DCT.
 * @param transform Array of values of the 2D transform in the frequency domain, in cartesian format:
 * transform[][][0] is the real part and transform[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., transform[u].length is always the same.
 * @returns The inverse DCT, in the same format.
 */
function idct(transform, convention) {
    if (!guards.isConvention(convention)) {
        throw new Error('Invalid convention.');
    }
    const M = transform.length;
    const N = transform[0].length;
    let norm_factor_outer = 1;
    let norm_factor_inner = 1;
    let signal = Array.from({ length: M }, () => {
        return Array.from({ length: N }, () => {
            return [0, 0];
        });
    });
    switch (convention) {
        case 'orthogonal_unitary':
            break;
        case 'unnormalized_forward':
            norm_factor_outer = ((2 / M) * (2 / N));
            break;
    }
    ;
    for (let x = 0; x < M; x++) {
        for (let y = 0; y < N; y++) {
            let sum = [0, 0];
            for (let u = 0; u < M; u++) {
                for (let v = 0; v < N; v++) {
                    switch (convention) {
                        case 'orthogonal_unitary':
                            norm_factor_inner = C(u, M, convention) * C(v, N, convention);
                            break;
                        case 'unnormalized_forward':
                            norm_factor_inner = C(u, M, convention) * C(v, N, convention);
                            break;
                    }
                    ;
                    sum = (0, utils_1.add)(sum, (0, utils_1.multiply)(transform[u][v], [norm_factor_inner * Math.cos(u * Math.PI * (x + 0.5) / M) * Math.cos(v * Math.PI * (y + 0.5) / N), 0]));
                }
            }
            signal[x][y] = (0, utils_1.multiply)([norm_factor_outer, 0], sum);
        }
    }
    return signal;
}
