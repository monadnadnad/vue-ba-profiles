<script setup lang="ts">
  import { ref, watch } from "vue";
  import BirthdayInput from "./components/BirthdayInput.vue";
  import QuizResult from "./components/QuizResult.vue";
  import { checkBirthday } from "./composables/useQuiz";
  import type { BirthdaySelection } from "./models/quiz";
  import type { Student } from "./models/student";

  const student: Student = {
    id: "hifumi",
    name: "ヒフミ",
    birthday: "11-27",
    profileImage: "",
  };

  const selection = ref<BirthdaySelection>({ month: null, day: null });
  const isCorrect = ref<boolean | null>(null);

  function submit() {
    if (selection.value.month === null || selection.value.day === null) return;

    const answer: BirthdaySelection = { month: selection.value.month, day: selection.value.day };

    isCorrect.value = checkBirthday(student.birthday, answer);
  }

  watch(
    selection,
    (val) => {
      if (val.month === null || val.day === null) {
        isCorrect.value = null;
      }
    },
    { deep: true }
  );
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-6">
        <v-card>
          <v-card-title>Momoquiz - {{ student.name }}</v-card-title>
          <v-card-text>
            <div class="mb-4">Select the birthday for {{ student.name }}:</div>
            <BirthdayInput v-model="selection" />
            <v-btn
              class="mt-4"
              color="primary"
              :disabled="selection.month === null || selection.day === null"
              @click="submit"
            >
              Check
            </v-btn>
            <QuizResult
              class="mt-4"
              :is-correct="isCorrect"
              :user-answer="selection"
              :correct-answer="student.birthday"
            />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
  .mb-4 {
    margin-bottom: 16px;
  }
  .mt-4 {
    margin-top: 16px;
  }
  .py-6 {
    padding-top: 24px;
    padding-bottom: 24px;
  }
</style>
