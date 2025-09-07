import students from "./data/students.json";
import type { Student } from "./types";

export type QuizKey = Exclude<keyof Student, "Id">;
export type QuizResult = "correct" | "partial" | "incorrect";

export interface Quiz<T extends QuizKey = QuizKey> {
  key: T;
  label: string;
  type: "text" | "select" | "autocomplete";
  options?: readonly string[];
  evaluate: (answer: string, correct: Student[T]) => QuizResult;
}

const normalize = (val: unknown, unit = "") =>
  String(val).trim().toLowerCase().replace(/\s+/g, " ").replace(new RegExp(unit, "g"), "");

const getOptions = (key: QuizKey): string[] => {
  const allValues = students.flatMap((s) => s[key]?.toString() ?? []);
  return [...new Set(allValues)].filter(Boolean).sort((a, b) => a.localeCompare(b, "ja"));
};

export const quizzes: Quiz[] = [
  {
    key: "School",
    label: "学園",
    type: "autocomplete",
    options: getOptions("School"),
    evaluate: (ans, cor) => (normalize(ans) === normalize(cor) ? "correct" : "incorrect"),
  },
  {
    key: "CharacterVoice",
    label: "声優",
    type: "autocomplete",
    options: getOptions("CharacterVoice"),
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
  {
    key: "Hobby",
    label: "趣味",
    type: "autocomplete",
    options: getOptions("Hobby"),
    evaluate: (ans, cor) => (normalize(ans) === normalize(cor) ? "correct" : "incorrect"),
  },
];

export const checkAnswer = (student: Student, quiz: Quiz, answer: string) => quiz.evaluate(answer, student[quiz.key]);
