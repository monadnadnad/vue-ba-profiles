import type { CombinedSelection } from "../models/quiz";
import type { Student } from "../models/student";

export type JudgeKey = keyof Student;
export type FieldSpec = { key: JudgeKey; label: string; kind: "equal" };

export const fieldSpecs: readonly FieldSpec[] = [
  { key: "birthdayMM", label: "誕生日(月)", kind: "equal" },
  { key: "birthdayDD", label: "誕生日(日)", kind: "equal" },
  { key: "school", label: "所属校", kind: "equal" },
] as const;

export function judge(field: FieldSpec, student: Student, sel: CombinedSelection): boolean {
  return (student as Record<JudgeKey, unknown>)[field.key] === (sel as Record<JudgeKey, unknown>)[field.key];
}
