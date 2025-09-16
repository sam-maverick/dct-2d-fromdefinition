export type Convention = 'orthogonal_unitary' | 'unnormalized_forward';
/**
 * This function calculates the 2D-DCT of a real or imaginary signal, from the definition of the DCT.
 * @param signal Array of values of the 2D signal in the spacial domain, in cartesian format:
 * signal[][][0] is the real part and signal[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., signal[x].length is always the same.
 * @returns The DCT of signal, in the same format.
 */
export declare function dct(signal: number[][][], convention: Convention): number[][][];
/**
 * This function calculates the inverse 2D-DCT, from the definition of the inverse DCT.
 * @param transform Array of values of the 2D transform in the frequency domain, in cartesian format:
 * transform[][][0] is the real part and transform[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., transform[u].length is always the same.
 * @returns The inverse DCT, in the same format.
 */
export declare function idct(transform: number[][][], convention: Convention): number[][][];
