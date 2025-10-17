<template>
  <v-card elevation="0">
    <v-card-title class="d-flex align-center pa-4">
      <v-avatar :image="iconUrl" class="mr-4" size="64" />
      <div class="text-h6 font-weight-bold">
        {{ studentName }}
      </div>
    </v-card-title>
    <v-divider class="my-2" />
    <v-card-text>
      <v-row dense>
        <v-col v-for="item in displayItems" :key="item.key" class="pa-md-2" cols="12" md="6">
          <div class="d-flex align-center">
            <v-chip color="primary" class="mr-4 justify-center" style="flex: 0 0 70px">
              {{ item.label }}
            </v-chip>
            <div class="flex-grow-1">
              <template v-if="!isSubmitted && item.quiz">
                <QuizChoice
                  v-if="item.quiz.type === 'choice'"
                  v-model="item.quiz"
                  :items="item.quiz.choices"
                  :class="item.widthClass"
                />
                <QuizMmdd v-else-if="item.quiz.type === 'mmdd'" v-model="item.quiz" :class="item.widthClass" />
              </template>
              <template v-else>
                <span class="mr-2">{{ item.value }}</span>
                <v-chip
                  v-if="item.quiz"
                  class="ml-2"
                  :color="results[item.key as QuizableKey] === 'correct' ? 'success' : 'error'"
                  variant="flat"
                  size="small"
                >
                  {{ results[item.key as QuizableKey] === "correct" ? "正解" : "不正解" }}
                </v-chip>
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn v-if="hasQuiz" :disabled="isSubmitted" variant="elevated" color="primary" @click="checkAnswers">
        回答する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { useQuiz } from "../composables/useQuiz";
import { profileFields } from "../profileFields";
import type { ProfileKey, Quiz, QuizPrefs, QuizableKey, Student } from "../types";
import QuizChoice from "./QuizChoice.vue";
import QuizMmdd from "./QuizMmdd.vue";

const props = defineProps<{
  student: Student;
  quizPrefs: QuizPrefs;
}>();

const studentRef = toRef(props, "student");
const quizPrefsRef = toRef(props, "quizPrefs");

const { quizzes, results, isSubmitted, hasQuiz, checkAnswers } = useQuiz(studentRef, quizPrefsRef, profileFields);

const iconUrl = computed(
  () => `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/icon/${props.student.Id}.webp`
);

const studentName = computed(() => {
  const name = props.student.Name;
  const familyName = props.student.FamilyName;
  return name.startsWith(familyName) ? name : familyName + name;
});

type DisplayItem = {
  key: ProfileKey;
  label: string;
  widthClass: string;
  value: string;
  quiz: Quiz | null;
};

const displayItems = computed<DisplayItem[]>(() =>
  profileFields.map((field) => {
    const quiz = "supportsQuiz" in field ? (quizzes.value[field.key as QuizableKey] ?? null) : null;

    return {
      key: field.key,
      label: field.label,
      widthClass: field.widthClass,
      value: props.student[field.key],
      quiz,
    };
  })
);
</script>

<style scoped>
.input-short {
  max-width: clamp(120px, 20vw, 160px);
}

.input-long {
  max-width: clamp(240px, 40vw, 320px);
}
</style>
