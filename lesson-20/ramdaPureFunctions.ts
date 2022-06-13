import { compose, map, reduce } from "ramda";

// // Задание 1 Напишем compose для поиска имени с наибольшим количеством очков. Вывести нужно только имя!
export type Team = { name: string; score: number };

const getName = (team: Team) => team.name;
const reducer = (teams: Team[]) => {
  return teams.reduce((prev: Team, cur: Team) =>
    prev.score >= cur.score ? prev : cur
  );
};
export const getTopName = compose(getName, reducer);

// // Задание 2

export type QsObj = Record<string, string | number | boolean | object>;
const addQMark = (x: string) => "?" + x;
const joinParams = (params: string[]) => params.join("&");
const mapValToParam = (qsObj: QsObj) =>
  map((key: string) => key + "=" + qsObj[key].toString(), Object.keys(qsObj));

export const createQs = compose(addQMark, joinParams, mapValToParam);

// Задание 3

const cutQMark = (qs: string) => (qs.startsWith("?") ? qs.substring(1) : qs);
const splitParams = (params: string): string[] => params.split("&");
const filterEmpty = (params: string[]): string[] =>
  params.filter((param) => param);
const filterEmptyVals = (params: string[]): string[] =>
  params.filter((param) => param.split("=").length > 1 && param.split("=")[1]);
const mapParams = (params: string[]): QsObj[] =>
  map((param) => {
    const paramArray = param.split("=");
    return { [paramArray[0]]: paramArray[1] };
  }, params);
const paramsToString = (params: QsObj[]) =>
  reduce(
    (prev, cur) => {
      return { ...prev, ...cur };
    },
    {},
    params
  );
export const parseQs = compose(
  paramsToString,
  mapParams,
  filterEmptyVals,
  filterEmpty,
  splitParams,
  cutQMark
);
