import type { WithNA } from "./na";
import type { Student } from "./student";

export type FieldKey = Exclude<keyof Student, "id" | "name" | "familyNameRuby" | "birthday">;

export type SelectionValueMap = {
  birthdayMM: WithNA<number>;
  birthdayDD: WithNA<number>;
  school: string | null;
  club: string | null;
  familyName: string | null;
  hobby: string | null;
  characterAge: string | null;
  characterVoice: string | null;
  charHeightMetric: string | null;
};

export type Selection = { [K in FieldKey]: SelectionValueMap[K] };

export interface CombinedSelection {
  birthdayMM: WithNA<number>;
  birthdayDD: WithNA<number>;
  school: string | null;
}

export type ResultField =
  | {
      key: "birthday";
      label: string;
      userInput: { month: WithNA<number>; day: WithNA<number> };
      ok: boolean;
      correct?: string;
    }
  | { key: "school"; label: string; userInput: string | null; ok: boolean; correct?: string };

export type ResultPayload = ResultField[];

export interface Quiz {
  student: Student;
  userSelection: Partial<Selection>;
  isCorrect: boolean | null;
}
