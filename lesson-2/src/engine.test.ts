import {
  clalulateFirstPriorities,
  calculateSecondPriorities,
  calculateThirdPriorities,
} from "./engine";

describe("firstPrioritiesCalc simple cases", () => {
  it("2 **", () => {
    expect(clalulateFirstPriorities([2, "**"])).toEqual([4]);
  });

  it("cos 0", () => {
    expect(clalulateFirstPriorities(["cos", 0])).toEqual([1]);
  });
});
describe("secondPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(calculateSecondPriorities([1, "*", 32])).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(calculateSecondPriorities([32, "/", 32])).toEqual([1]);
  });

  it("[32, + 32]", () => {
    expect(calculateSecondPriorities([32, "+", 32])).toEqual([32, "+", 32]);
  });
});

describe("firstPrioritiesCalc mixed with second priorities cases", () => {
  it("[32, /, cos, 0]", () => {
    expect(clalulateFirstPriorities([32, "/", "cos", 0])).toEqual([32, "/", 1]);
  });
});

describe("secondPrioritiesCalc mixed with third priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(calculateSecondPriorities([32, "/", 32, "+", 10, "*", 10])).toEqual([
      1,
      "+",
      100,
    ]);
  });
});

describe("thirdPrioritiesCalc invalid cases", () => {
  it("[32, / 32]", () => {
    expect(() => calculateThirdPriorities([32, "/", 32])).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("thirdPrioritiesCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(calculateThirdPriorities([32, "+", 32])).toEqual(64);
  });

  it("[32, - 32]", () => {
    expect(calculateThirdPriorities([32, "-", 32])).toEqual(0);
  });

  it("[32, - 32, +, 10]", () => {
    expect(calculateThirdPriorities([32, "-", 32, "+", 10])).toEqual(10);
  });
});
