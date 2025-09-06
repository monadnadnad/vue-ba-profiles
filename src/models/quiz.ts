import type { Student } from "./student";

export type BirthdaySelection = {
  month: number | null;
  day: number | null;
};

export type SchoolSelection = string | null;

export interface CombinedSelection {
  birthday: BirthdaySelection;
  school: SchoolSelection;
}

export type ResultField =
  | { key: "birthday"; label: string; userInput: BirthdaySelection; correct: string; ok: boolean }
  | { key: "school"; label: string; userInput: SchoolSelection; correct: string; ok: boolean };

export type ResultPayload = ResultField[];

export interface Quiz {
  student: Student;
  userSelection: CombinedSelection;
  isCorrect: boolean | null;
}
