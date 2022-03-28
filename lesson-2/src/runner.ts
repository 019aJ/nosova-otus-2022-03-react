import { parser } from "./parser";

import {
  clalulateFirstPriorities,
  calculateSecondPriorities,
  calculateThirdPriorities,
} from "./engine";

export const runner = (line: string): number => {
  const stack = parser(line);

  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  const firstPrioritiesRes = clalulateFirstPriorities(stack);

  if (firstPrioritiesRes.length === 1) {
    return Number(firstPrioritiesRes[0]);
  }

  const secondPrioritiesRes = calculateSecondPriorities(firstPrioritiesRes);
  if (secondPrioritiesRes.length === 1) {
    return Number(secondPrioritiesRes[0]);
  }
  return calculateThirdPriorities(secondPrioritiesRes);
};
