import schools from "./data/schools.json";
import type { Student } from "./types";

export type QuizKey = Exclude<keyof Student, "Id">;
export type QuizResult = "correct" | "partial" | "incorrect";

export interface Quiz<T extends QuizKey = QuizKey> {
  key: T;
  label: string;
  type: "text" | "select";
  options?: readonly string[];
  evaluate: (answer: string, correct: Student[T]) => QuizResult;
}

const normalize = (val: unknown, unit = "") =>
  String(val).trim().toLowerCase().replace(/\s+/g, " ").replace(new RegExp(unit, "g"), "");

export const quizzes: Quiz[] = [
  {
    key: "School",
    label: "所属校",
    type: "select",
    options: schools,
    evaluate: (ans, cor) => (normalize(ans) === normalize(cor) ? "correct" : "incorrect"),
  },
  {
    key: "CharacterAge",
    label: "年齢",
    type: "text",
    evaluate: (ans, cor) => (normalize(ans, "歳") === normalize(cor, "歳") ? "correct" : "incorrect"),
  },
  {
    key: "CharHeightMetric",
    label: "身長",
    type: "text",
    evaluate: (ans, cor) => (normalize(ans, "cm") === normalize(cor, "cm") ? "correct" : "incorrect"),
  },
  {
    key: "BirthDayMM",
    label: "誕生月",
    type: "text",
    evaluate: (ans, cor) => (normalize(ans, "月") === normalize(cor, "月") ? "correct" : "incorrect"),
  },
  {
    key: "BirthDayDD",
    label: "誕生日",
    type: "text",
    evaluate: (ans, cor) => (normalize(ans, "日") === normalize(cor, "日") ? "correct" : "incorrect"),
  },
];

export const checkAnswer = (student: Student, quiz: Quiz, answer: string) => quiz.evaluate(answer, student[quiz.key]);
