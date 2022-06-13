// // Задание 1 Получить из A -> B не мутируя оригинальный объект
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  const { size, name, ...rest } = originalTeam;
  return { name: "New York Badgers", roster: 25, ...rest };
};

// // Задание 2
type SomeArray = readonly number[] | string[] | number[] | (string | number)[];

export const originalArrayToExpectedArray = (
  originalArray: SomeArray
): SomeArray => {
  //[1, 2, 3, 4]->["two", 3, 4, 5]
  const [, second, ...other] = originalArray;
  const secondValue = second === 2 ? "two" : second;
  let last = other[other.length - 1];
  last = typeof last === "number" ? last + 1 : last;
  return [secondValue, ...other, last];
};

// // Задание 3

export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeamDeep = (originalTeam: Team): Team => {
  const { captain, ...rest } = originalTeam;
  const { age, ...restcaptain } = originalTeam.captain;
  return {
    ...rest,
    captain: {
      ...restcaptain,
      age: 28,
    },
  };
};
