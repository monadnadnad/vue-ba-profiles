import allStudentsData from "./data/students.json";
import type { KeyToLabel, QuizableKey, QuizFor, Student } from "./types";

export const keyToLabel: KeyToLabel = {
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

export function makeQuiz<K extends QuizableKey>(st: Student, key: K): QuizFor<K> | undefined {
  const answer = st[key];
  if (!answer || answer === "-") return undefined;

  if (key === "BirthDay") {
    const m = /^(\d{1,2})\/(\d{1,2})$/.exec(String(answer));
    if (!m) return undefined;
    const [, mm, dd] = m;
    return {
      type: "mmdd",
      key,
      answerMM: mm,
      answerDD: dd,
      userMM: "",
      userDD: "",
    } as QuizFor<K>;
  }

  return {
    type: "choice",
    key,
    answer: String(answer),
    choices: createChoices(key as Exclude<K, "BirthDay">),
    userChoice: null,
  } as QuizFor<K>;
}
