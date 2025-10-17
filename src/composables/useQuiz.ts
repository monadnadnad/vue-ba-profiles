import type { Ref } from "vue";
import { computed, ref, watch } from "vue";

import type { ProfileFieldConfig, QuizableProfileField } from "../profileFields";
import type { Quiz, QuizPrefs, QuizResult, QuizableKey, Student } from "../types";
import { makeQuiz } from "../utils";

type QuizMap = Partial<Record<QuizableKey, Quiz>>;
type ResultMap = Partial<Record<QuizableKey, QuizResult>>;

export function useQuiz(student: Ref<Student>, quizPrefs: Ref<QuizPrefs>, fields: readonly ProfileFieldConfig[]) {
  const quizzes = ref<QuizMap>({});
  const results = ref<ResultMap>({});

  const activeFields = computed(() =>
    fields.filter((field): field is QuizableProfileField => {
      if (!("supportsQuiz" in field)) return false;
      return quizPrefs.value[field.key];
    })
  );

  watch(
    [student, quizPrefs],
    () => {
      results.value = {};
      const next: QuizMap = {};
      for (const field of activeFields.value) {
        const quiz = makeQuiz(student.value, field.key);
        if (quiz) {
          next[field.key] = quiz;
        }
      }
      quizzes.value = next;
    },
    { immediate: true, deep: true }
  );

  const isSubmitted = computed(() => Object.keys(results.value).length > 0);
  const hasQuiz = computed(() => activeFields.value.length > 0);

  function checkAnswers() {
    for (const field of activeFields.value) {
      const quiz = quizzes.value[field.key];
      if (!quiz) continue;

      const correct =
        quiz.type === "choice"
          ? quiz.userChoice === quiz.answer
          : quiz.userMM === quiz.answerMM && quiz.userDD === quiz.answerDD;

      results.value[field.key] = correct ? "correct" : "incorrect";
    }
  }

  function reset() {
    results.value = {};
    for (const field of activeFields.value) {
      const quiz = quizzes.value[field.key];
      if (!quiz) continue;

      if (quiz.type === "choice") {
        quiz.userChoice = null;
      } else {
        quiz.userMM = "";
        quiz.userDD = "";
      }
    }
  }

  return { quizzes, results, isSubmitted, hasQuiz, checkAnswers, reset };
}
