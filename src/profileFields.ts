import type { ProfileKey, QuizableKey } from "./types";

export type ProfileFieldWidth = "input-short" | "input-long";

type CommonField<K extends ProfileKey> = {
  readonly key: K;
  readonly label: string;
  readonly widthClass: ProfileFieldWidth;
};

export type NonQuizProfileField = CommonField<Exclude<ProfileKey, QuizableKey>>;
export type QuizProfileField = CommonField<QuizableKey> & {
  readonly supportsQuiz: true;
};

export type ProfileFieldConfig = NonQuizProfileField | QuizProfileField;

export const profileFields = [
  { key: "School", label: "学園", widthClass: "input-long" },
  { key: "SchoolYear", label: "学年", widthClass: "input-short" },
  { key: "Club", label: "部活動", widthClass: "input-long" },
  { key: "CharacterAge", label: "年齢", widthClass: "input-short", supportsQuiz: true },
  { key: "BirthDay", label: "誕生日", widthClass: "input-short", supportsQuiz: true },
  { key: "CharHeightMetric", label: "身長", widthClass: "input-short", supportsQuiz: true },
  { key: "Hobby", label: "趣味", widthClass: "input-long", supportsQuiz: true },
  { key: "CharacterVoice", label: "CV", widthClass: "input-long", supportsQuiz: true },
] as const satisfies ReadonlyArray<ProfileFieldConfig>;

export type ProfileField = (typeof profileFields)[number];
export type QuizableProfileField = Extract<ProfileField, { supportsQuiz: true }>;

export const quizableProfileFields = profileFields.filter(
  (field): field is QuizableProfileField => "supportsQuiz" in field
);

export const profileLabelMap = profileFields.reduce(
  (acc, field) => {
    acc[field.key] = field.label;
    return acc;
  },
  {} as Record<ProfileKey, string>
);
