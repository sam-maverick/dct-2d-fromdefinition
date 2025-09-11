import { add, multiply } from './utils';
import * as guards from './index.guard'

// Type must be exported for the --export-all option of ts-export-guard in the build script of package.json
export type Convention = 'orthogonal_unitary' | 'unnormalized_forward';

function C (a: number, D: number, convention: Convention) {
      switch(convention) {
        case 'orthogonal_unitary':
          if (a===0) {
            return Math.sqrt(1/D);
          } else {
            return Math.sqrt(2/D);
          }
        case 'unnormalized_forward':
          if (a===0) {
            return 1/2;
          } else {
            return 1;
          }
        default:
          return 0;
      };
}


/**
 * This function calculates the 2D-DCT of a real or imaginary signal, from the definition of the DCT.
 * @param signal Array of values of the 2D signal in the spacial domain, in cartesian format:
 * signal[][][0] is the real part and signal[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., signal[x].length is always the same.
 * @returns The DCT of signal, in the same format.
 */
export function dct (signal: number[][][], convention: Convention) {
  if ( ! guards.isConvention(convention))  { throw new Error('Invalid convention.'); }

  const M = signal.length;
  const N = signal[0].length;

  let norm_factor_outer = 1;

  let transform = Array.from({ length: M }, () => {
    return Array.from({ length: N }, () => {
      return [0,0];
    });
  });

  for (let u=0; u<M; u++) {
    for (let v=0; v<N; v++) {

      switch(convention) {
        case 'orthogonal_unitary':
          norm_factor_outer = C(u, M, convention) * C(v, N, convention);
          break;
        case 'unnormalized_forward':
          break;
      };

      let sum = [0,0];
      for (let x=0; x<M; x++) {
        for (let y=0; y<N; y++) {
          sum = add ( sum, multiply ( signal[x][y], [Math.cos(u*Math.PI*(x+0.5)/M) * Math.cos(v*Math.PI*(y+0.5)/N), 0] ) ) ;
        }
      }
      transform[u][v] = multiply([norm_factor_outer,0], sum);

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
export function idct (transform: number[][][], convention: Convention) {
  if ( ! guards.isConvention(convention))  { throw new Error('Invalid convention.'); }

  const M = transform.length;
  const N = transform[0].length;

  let norm_factor_outer = 1;
  let norm_factor_inner = 1;

  let signal = Array.from({ length: M }, () => {
    return Array.from({ length: N }, () => {
      return [0,0];
    });
  });

  switch(convention) {
    case 'orthogonal_unitary':
      break;
    case 'unnormalized_forward':
      norm_factor_outer = ((2/M)*(2/N));
      break;
  };

  for (let x=0; x<M; x++) {
    for (let y=0; y<N; y++) {

      let sum = [0,0];
      for (let u=0; u<M; u++) {
        for (let v=0; v<N; v++) {

          switch(convention) {
            case 'orthogonal_unitary':
              norm_factor_inner = C(u, M, convention) * C(v, N, convention);
              break;
            case 'unnormalized_forward':
              norm_factor_inner = C(u, M, convention) * C(v, N, convention);
              break;
          };

          sum = add ( sum, multiply ( transform[u][v], [norm_factor_inner * Math.cos(u*Math.PI*(x+0.5)/M) * Math.cos(v*Math.PI*(y+0.5)/N), 0] ) ) ;

        }
      }

      signal[x][y] = multiply([norm_factor_outer,0], sum);

    }
  }

  return signal;

}

