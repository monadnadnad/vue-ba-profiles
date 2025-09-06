<script setup lang="ts">
  import { ref, watch } from "vue";
  import BirthdayInput from "./components/BirthdayInput.vue";
  import QuizResult from "./components/QuizResult.vue";
  import SchoolInput from "./components/SchoolInput.vue";
  import { fieldSpecs, judge } from "./composables/useQuiz";
  import studentsData from "./data/students.json";
  import { NA } from "./models/na";
  import type { CombinedSelection, ResultPayload } from "./models/quiz";
  import type { RawStudent, Student } from "./models/student";
  import { normalizeStudent } from "./models/student";

  const students = (studentsData as RawStudent[]).map(normalizeStudent) as Student[];
  const student: Student = students[Math.floor(Math.random() * students.length)];

  const selection = ref<CombinedSelection>({ birthdayMM: NA, birthdayDD: NA, school: null });
  const isCorrect = ref<boolean | null>(null);
  const results = ref<ResultPayload>([]);

  function submit() {
    const s = selection.value.school;
    if (selection.value.birthdayMM === NA || selection.value.birthdayDD === NA || !s) return;

    const birthdayMMSpec = fieldSpecs.find((f) => f.key === "birthdayMM")!;
    const birthdayDDSpec = fieldSpecs.find((f) => f.key === "birthdayDD")!;
    const schoolSpec = fieldSpecs.find((f) => f.key === "school")!;
    const birthdayCorrect =
      judge(birthdayMMSpec, student, selection.value) && judge(birthdayDDSpec, student, selection.value);
    const schoolCorrect = judge(schoolSpec, student, selection.value);

    isCorrect.value = birthdayCorrect && schoolCorrect;
    results.value = [
      {
        key: "birthday",
        label: "誕生日",
        userInput: { month: selection.value.birthdayMM, day: selection.value.birthdayDD },
        correct: student.birthday,
        ok: birthdayCorrect,
      },
      { key: "school", label: "所属校", userInput: s, correct: student.school, ok: schoolCorrect },
    ];
  }

  watch(
    selection,
    (val) => {
      const { birthdayMM, birthdayDD, school } = val;
      if (birthdayMM === NA || birthdayDD === NA || !school) {
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
            <BirthdayInput v-model:month="selection.birthdayMM" v-model:day="selection.birthdayDD" />
            <SchoolInput v-model="selection.school" />
            <v-btn
              class="mt-4"
              color="primary"
              :disabled="selection.birthdayMM === NA || selection.birthdayDD === NA || !selection.school"
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
