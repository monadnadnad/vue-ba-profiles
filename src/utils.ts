import allStudentsData from "./data/students.json";
import type { ProfileKey, Quiz, QuizableKey, Student } from "./types";

export const keyToLabel: Record<ProfileKey, string> = {
  School: "学園",
  SchoolYear: "学年",
  Club: "部活動",
  BirthDay: "誕生日",
  CharHeightMetric: "身長",
  Hobby: "趣味",
  CharacterAge: "年齢",
  CharacterVoice: "CV",
};

const students = allStudentsData as Student[];
const createChoices = (key: QuizableKey): string[] => {
  const values = students.map((s) => s[key]).filter(Boolean);
  const dedup = new Set(values);
  const sorted = Array.from(dedup).sort((a, b) => (a && b ? a.localeCompare(b) : 0));
  return sorted;
};

export function makeQuiz(st: Student, key: QuizableKey): Quiz | null {
  const answer = st[key];
  if (!answer || answer === "-") return null;

  if (key === "BirthDay") {
    const [mm, dd] = (/^(\d{1,2})\/(\d{1,2})$/.exec(answer) ?? []).slice(1);
    if (!mm || !dd) return null;
    return {
      type: "mmdd",
      key,
      answerMM: mm,
      answerDD: dd,
      userMM: "",
      userDD: "",
    };
  }

  return {
    type: "choice",
    key,
    answer: String(answer),
    choices: createChoices(key),
    userChoice: null,
  };
}
