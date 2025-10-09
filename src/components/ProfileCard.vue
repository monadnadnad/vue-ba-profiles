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
        <v-col v-for="item in profileItems" :key="item.key" class="pa-md-2" cols="12" md="6">
          <div class="d-flex align-center">
            <v-chip color="primary" class="mr-4 justify-center" style="flex: 0 0 70px">
              {{ item.label }}
            </v-chip>
            <div class="flex-grow-1">
              <template v-if="!isSubmitted && item.quiz && quizPrefs[item.key as QuizableKey]">
                <QuizChoice
                  v-if="item.quiz.type === 'choice'"
                  v-model="item.quiz"
                  :items="item.quiz.choices"
                  :class="widthClass(item.key)"
                />
                <QuizMmdd v-else-if="item.quiz.type === 'mmdd'" v-model="item.quiz" class="input-short" />
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
import { computed, ref, watch } from "vue";
import type { ProfileItem, ProfileKey, QuizableKey, QuizPrefs, QuizResult, Student } from "../types";
import { keyToLabel, makeQuiz } from "../utils";
import QuizChoice from "./QuizChoice.vue";
import QuizMmdd from "./QuizMmdd.vue";

const displayKeys: Array<ProfileKey> = [
  "School",
  "SchoolYear",
  "Club",
  "CharacterAge",
  "BirthDay",
  "CharHeightMetric",
  "Hobby",
  "CharacterVoice",
];

const props = defineProps<{
  student: Student;
  quizPrefs: QuizPrefs;
}>();

const results = ref<Partial<Record<QuizableKey, QuizResult>>>({});
const isSubmitted = computed(() => Object.keys(results.value).length > 0);

const iconUrl = computed(
  () => `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/icon/${props.student.Id}.webp`
);

const studentName = computed(() => {
  const name = props.student.Name;
  const familyName = props.student.FamilyName;
  return name.startsWith(familyName) ? name : familyName + name;
});

const profileItems = ref<ProfileItem[]>([]);
watch(
  () => [props.student.Id, props.quizPrefs],
  () => {
    profileItems.value = displayKeys.map((key) => ({
      key,
      label: keyToLabel[key],
      value: props.student[key],
      quiz: props.quizPrefs[key as QuizableKey] ? makeQuiz(props.student, key as QuizableKey) : undefined,
    }));
  },
  { immediate: true, deep: true }
);

const hasQuiz = computed(() => profileItems.value.some((item) => item.quiz));
const widthClass = (key: string) => (["CharHeightMetric", "CharacterAge"].includes(key) ? "input-short" : "input-long");

function checkAnswers() {
  profileItems.value.forEach(({ key, quiz }) => {
    if (!quiz) return;
    const isCorrect =
      quiz.type === "choice"
        ? quiz.userChoice === quiz.answer
        : quiz.type === "mmdd"
          ? quiz.userMM === quiz.answerMM && quiz.userDD === quiz.answerDD
          : false;
    results.value[key as QuizableKey] = isCorrect ? "correct" : "incorrect";
  });
}
</script>

<style scoped>
.input-short {
  max-width: clamp(120px, 20vw, 160px);
}

.input-long {
  max-width: clamp(240px, 40vw, 320px);
}
</style>
