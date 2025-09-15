<template>
  <v-card elevation="0">
    <v-card-title class="d-flex align-center pa-4">
      <v-avatar :image="iconUrl" class="mr-4" size="64" />
      <div class="text-h6 font-weight-bold">
        {{ student.FamilyName + student.Name }}
      </div>
    </v-card-title>
    <v-divider class="my-2" />
    <v-card-text>
      <v-row dense>
        <v-col v-for="item in profileItems" :key="item.key" cols="12" md="6">
          <div class="d-flex align-center" style="min-height: 56px">
            <v-chip color="primary" class="mr-4 justify-center" style="flex: 0 0 70px">
              {{ item.label }}
            </v-chip>

            <div v-if="item.quiz && !isSubmitted" class="flex-grow-1" :class="widthClass(item.key)">
              <QuizChoice v-if="item.quiz.type === 'choice'" v-model="item.quiz" :items="item.quiz.choices" />
              <QuizMmdd v-if="item.quiz.type === 'mmdd'" v-model="item.quiz" />
            </div>

            <div v-else class="d-flex align-center flex-grow-1">
              <span class="mr-2">{{ item.value }}</span>
              <v-chip
                v-if="isSubmitted && item.quiz"
                :color="results[item.key] === 'correct' ? 'success' : 'error'"
                variant="flat"
                size="small"
              >
                {{ results[item.key] === "correct" ? "正解" : "不正解" }}
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn v-if="hasQuiz && !isSubmitted" variant="elevated" color="primary" @click="checkAnswers">回答する</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import type { ProfileKey, Quiz, QuizableKey, QuizPrefs, QuizResult, Student } from "../types";
  import { keyToLabel, makeQuiz } from "../utils";
  import QuizChoice from "./QuizChoice.vue";
  import QuizMmdd from "./QuizMmdd.vue";

  const props = defineProps<{
    student: Student;
    quizPrefs: QuizPrefs;
  }>();

  const isSubmitted = ref(false);
  const results = ref<Record<string, QuizResult>>({});

  const iconUrl = computed(
    () => `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/icon/${props.student.Id}.webp`
  );
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

  type ProfileItem = {
    key: ProfileKey;
    label: string;
    value: string;
    quiz: Quiz | null;
  };
  const profileItems = ref<ProfileItem[]>([]);
  watch(
    () => [props.student, props.quizPrefs],
    () => {
      profileItems.value = displayKeys.map((key) => ({
        key: key,
        label: keyToLabel[key as QuizableKey],
        value: props.student[key],
        quiz: props.quizPrefs[key as QuizableKey] ? makeQuiz(props.student, key as QuizableKey) : null,
      }));
      isSubmitted.value = false;
      results.value = {};
    },
    { immediate: true, deep: true }
  );

  const hasQuiz = computed(() => profileItems.value.some((item) => item.quiz));
  const widthClass = (key: string) =>
    ["CharHeightMetric", "CharacterAge", "BirthDay"].includes(key) ? "input-short" : "";

  const checkAnswers = () => {
    profileItems.value.forEach(({ key, quiz }) => {
      if (!quiz) return;
      let isCorrect = false;
      if (quiz.type === "choice") {
        isCorrect = quiz.userChoice === quiz.answer;
      } else if (quiz.type === "mmdd") {
        isCorrect = quiz.userMM === quiz.answerMM && quiz.userDD === quiz.answerDD;
      }
      results.value[key] = isCorrect ? "correct" : "incorrect";
    });
    isSubmitted.value = true;
  };
</script>

<style>
  .input-short {
    max-width: 160px;
  }
</style>
