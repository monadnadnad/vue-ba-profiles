import type { Student } from "./student";

export type BirthdaySelection = {
  month: number | null;
  day: number | null;
};

export interface Quiz {
  student: Student;
  question: string;
  userSelection: BirthdaySelection;
  isCorrect: boolean | null;
}
