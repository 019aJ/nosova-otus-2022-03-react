import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
  mathSingleOperandOperators,
} from "./mathOperators";

const [FIRST, SECOND, THIRD] = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    // cos 0
    // но 2 **
    const prevItem = result[result.length - 1];
    const item = nextItem;

    if (
      !isNumber(String(item)) &&
      mathOperatorsPriorities[item] === FIRST &&
      isNumber(String(prevItem))
    ) {
      if (mathSingleOperandOperators[item]) {
        result = [
          ...result.slice(0, -1),
          mathSingleOperandOperators[item](Number(prevItem)),
        ];
      } else {
        throw new TypeError("Unexpected stack!");
      }
    } else if (
      !isNumber(String(prevItem)) &&
      mathOperatorsPriorities[prevItem] === FIRST &&
      isNumber(String(item))
    ) {
      if (mathSingleOperandOperators[prevItem]) {
        result = [
          ...result.slice(0, -1),
          mathSingleOperandOperators[prevItem](Number(item)),
        ];
      } else {
        throw new TypeError("Unexpected stack!");
      }
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const secondPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
      if (mathOperators[item]) {
        result = [
          ...result.slice(0, -2),
          mathOperators[item](Number(prevItem), Number(nextItem)),
        ];
      } else {
        throw new TypeError("Unexpected stack!");
      }
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const thirdPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];
    const priority = mathOperatorsPriorities[item];
    if (priority === SECOND || priority === FIRST) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && priority === THIRD) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return result;
  }, Number(stack[0]));
