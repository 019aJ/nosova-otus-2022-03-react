export type ScalarOperationType = (first: number, second: number) => number;
export type SingleOperandType = (first: number) => number;

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const sqr: SingleOperandType = (first: number): number => first * first;

export const power: ScalarOperationType = (
  first: number,
  second: number
): number => first ** second;

export const sin: SingleOperandType = (first: number): number =>
  Math.sin(first);

export const cos: SingleOperandType = (first: number): number =>
  Math.cos(first);

export const factorial: SingleOperandType = (first: number): number => {
  let rval = 1;
  for (let i = 2; i <= first; i++) rval *= i;
  return rval;
};

export const mathOperators: { [key: string]: ScalarOperationType } = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  "**": sqr,
  "^": power,
  sin,
  cos,
  factorial,
};

export const mathSingleOperandOperators: { [key: string]: SingleOperandType } =
  {
    "**": sqr,
    sin,
    cos,
    factorial,
  };

export const mathPriorities: number[] = [1, 2, 3];

const [FIRST, SECOND, THIRD] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  "*": SECOND,
  "/": SECOND,
  "+": THIRD,
  "-": THIRD,
  "**": FIRST,
  "^": SECOND,
  sin: FIRST,
  cos: FIRST,
  factorial: FIRST,
};

export const isSupportedOperation = (name: string): boolean =>
  mathOperators.hasOwnProperty(name) ||
  mathSingleOperandOperators.hasOwnProperty(name);

export const operandCount = (item: string): number => {
  if (typeof mathOperators[item] === typeof mathOperators["*"]) {
  }
  return 1;
};
