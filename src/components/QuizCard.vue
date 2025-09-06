<template>
  <v-card>
    <v-card-title>名前: {{ student.Name }}</v-card-title>
    <v-card-text>
      <QuizItem
        v-for="q in quizzes"
        :key="q.key"
        v-model="answers[q.key]"
        :quiz="q"
        :is-judged="!!results[q.key]"
        :result="results[q.key]"
        :correct-answer="String(student[q.key])"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="judge">判定</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { checkAnswer, quizzes, type QuizResult } from "../quiz";
  import type { Student } from "../types";
  import QuizItem from "./QuizItem.vue";

  const props = defineProps<{ student: Student }>();

  const answers = ref<Record<string, string>>(quizzes.reduce((a, c) => ({ ...a, [c.key]: "" }), {}));
  const results = ref<Record<string, QuizResult | null>>({});

  const judge = () => {
    quizzes.forEach((q) => {
      results.value[q.key] = checkAnswer(props.student, q, answers.value[q.key]);
    });
  };
</script>
