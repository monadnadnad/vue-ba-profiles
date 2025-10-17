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

export type ProfileKey = Exclude<keyof Student, "Id" | "Name" | "FamilyName" | "FamilyNameRuby">;
export type KeyToLabel = Record<ProfileKey, string>;
export type ProfileItem<T extends ProfileKey = ProfileKey> = {
  key: T;
  label: KeyToLabel[T];
  value: Student[T];
  quiz?: T extends QuizableKey ? QuizFor<T> : undefined;
};

export type QuizableKey = "BirthDay" | "Hobby" | "CharacterVoice" | "CharHeightMetric" | "CharacterAge";
export type QuizResult = "correct" | "incorrect";
export type QuizFor<K extends QuizableKey> = K extends "BirthDay" ? MMDDQuiz : ChoiceQuiz;
export type QuizPrefs = Record<QuizableKey, boolean>;

export type MMDDQuiz = {
  readonly type: "mmdd";
  readonly key: "BirthDay";
  answerMM: string;
  answerDD: string;
  userMM: string;
  userDD: string;
};

export type Choice = string;
export type ChoiceQuiz<TChoice extends Choice = Choice> = {
  readonly type: "choice";
  readonly key: QuizableKey;
  choices: TChoice[];
  answer: TChoice;
  userChoice: TChoice | null;
};

export type Quiz = MMDDQuiz | ChoiceQuiz;
