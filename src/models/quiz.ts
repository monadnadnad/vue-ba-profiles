import type { Student } from "./student";

export type FieldKey = Exclude<keyof Student, "id" | "name" | "familyNameRuby">;

export type BirthdaySelection = {
  month: number | null;
  day: number | null;
};

export type SelectionValueMap = {
  birthday: BirthdaySelection;
  school: string | null;
  club: string | null;
  familyName: string | null;
  hobby: string | null;
  characterAge: string | null;
  characterVoice: string | null;
  charHeightMetric: string | null;
};

export type Selection = { [K in FieldKey]: SelectionValueMap[K] };

export type SchoolSelection = string | null;

export interface CombinedSelection {
  birthday: BirthdaySelection;
  school: SchoolSelection;
}

export type ResultField =
  | { key: "birthday"; label: string; userInput: BirthdaySelection; ok: boolean; correct?: string }
  | { key: "school"; label: string; userInput: SchoolSelection; ok: boolean; correct?: string };

export type ResultPayload = ResultField[];

export interface Quiz {
  student: Student;
  userSelection: Partial<Selection>;
  isCorrect: boolean | null;
}
