<script setup lang="ts">
  import { ref, watch } from "vue";
  import BirthdayInput from "./components/BirthdayInput.vue";
  import QuizResult from "./components/QuizResult.vue";
  import SchoolInput from "./components/SchoolInput.vue";
  import { checkBirthday, checkSchool } from "./composables/useQuiz";
  import studentsData from "./data/students.json";
  import type { CombinedSelection, ResultPayload } from "./models/quiz";
  import type { RawStudent, Student } from "./models/student";
  import { normalizeStudent } from "./models/student";

  const students = (studentsData as RawStudent[]).map(normalizeStudent) as Student[];
  const student: Student = students[Math.floor(Math.random() * students.length)];

  const selection = ref<CombinedSelection>({ birthday: { month: null, day: null }, school: null });
  const isCorrect = ref<boolean | null>(null);
  const results = ref<ResultPayload>([]);

  function submit() {
    const b = selection.value.birthday;
    const s = selection.value.school;
    if (!b.month || !b.day || !s) return;

    const birthdayCorrect = checkBirthday(student.birthday, { month: b.month, day: b.day });
    const schoolCorrect = checkSchool(student.school, s);

    isCorrect.value = birthdayCorrect && schoolCorrect;
    results.value = [
      {
        key: "birthday",
        label: "誕生日",
        userInput: { month: b.month, day: b.day },
        correct: student.birthday,
        ok: birthdayCorrect,
      },
      { key: "school", label: "所属校", userInput: s, correct: student.school, ok: schoolCorrect },
    ];
  }

  watch(
    selection,
    (val) => {
      const { birthday, school } = val;
      if (!birthday.month || !birthday.day || !school) {
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
            <div class="mb-2">回答対象: {{ student.name }}</div>
            <div class="mb-2">誕生日と所属校を両方答えてください。</div>
            <BirthdayInput v-model="selection.birthday" />
            <SchoolInput v-model="selection.school" />
            <v-btn
              class="mt-4"
              color="primary"
              :disabled="!selection.birthday.month || !selection.birthday.day || !selection.school"
              @click="submit"
            >
              Check
            </v-btn>
            <QuizResult class="mt-4" :is-correct="isCorrect" :results="results" />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
