import type { Quiz, QuizableKey, Student } from "./types";

export function makeQuiz(st: Student, key: QuizableKey): Quiz | null {
  switch (key) {
    case "BirthDay": {
      if (st.BirthDay === "-") return null;
      const [mm, dd] = (/^(\d{2})\/(\d{2})$/.exec(st.BirthDay) ?? []).slice(1);
      return { type: "mmdd", key, answerMM: mm, answerDD: dd };
    }
    case "CharHeightMetric": {
      const vcm = st.CharHeightMetric;
      if (vcm === "未測定" || vcm === "-") return null;
      const v = vcm.replace("cm", "").trim();
      if (Number.isNaN(Number(v))) return null;
      return { type: "fill-in", key, answer: v };
    }
    default: {
      const v = st[key];
      if (!v) return null;
      return { type: "fill-in", key, answer: String(v) };
    }
  }
}
