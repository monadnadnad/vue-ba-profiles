export interface Student {
  Id: number;
  Name: string;
  School: string;
  SchoolYear: string;
  Club: string;
  BirthDay: string;
  FamilyName: string;
  FamilyNameRuby: string;
  Hobby: string;
  CharacterAge: string;
  CharacterVoice: string;
  CharHeightMetric: string;
}

export type QuizableKey = "BirthDay" | "School" | "CharacterVoice" | "CharHeightMetric";
export type QuizInputType = "text" | "autocomplete";
export type QuizResult = "correct" | "incorrect";
export type QuizPrefs = Partial<Record<QuizableKey, boolean>>;

export const defaultQuizPrefs: QuizPrefs = {
  BirthDay: true,
  CharacterVoice: true,
  CharHeightMetric: true,
};

export type FillInQuiz<K extends QuizableKey = QuizableKey> = {
  type: "fill-in";
  key: K;
  answer: string;
};

export type ChoiceQuiz<K extends QuizableKey = QuizableKey> = {
  type: "choice";
  key: K;
  choices: string[];
  answer: string;
};

export type MMDDQuiz = {
  type: "mmdd";
  key: "BirthDay";
  answerMM: string;
  answerDD: string;
};

export type Quiz = FillInQuiz | ChoiceQuiz | MMDDQuiz;
