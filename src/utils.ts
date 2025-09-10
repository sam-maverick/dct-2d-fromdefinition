
export const TWO_PI = 2 * Math.PI;

// complex multiplication
export function multiply (a: number[], b: number[]) {
  return [
    a[0] * b[0] - a[1] * b[1],
    a[0] * b[1] + a[1] * b[0]
  ];
}

// complex addition
export function add (a: number[], b: number[]) {
  return [
    a[0] + b[0],
    a[1] + b[1]
  ];
}

// complex subtraction
export function subtract (a: number[], b: number[]) {
  return [
    a[0] - b[0],
    a[1] - b[1]
  ];
}

// euler's identity e^(j*x) = cos(x) + j*sin(x)
// and e^(-j*x) = cos(x) - j*sin(x)
// for x >= 0
export function exponential (theta: number) {
  if (theta >= 0) {
    return [Math.cos(theta), Math.sin(theta)];
  } else {
    return [Math.cos(Math.abs(theta)), -Math.sin(Math.abs(theta))];
  }
}

// complex conjugate
export function conjugate (a: number[]) {
  return [a[0], -a[1]];
}

