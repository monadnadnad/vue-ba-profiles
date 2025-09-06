<template>
  <v-app>
    <v-main>
      <v-container>
        <QuizCard v-if="currentStudent" :key="currentStudent.Id" :student="currentStudent" />
        <div class="d-flex justify-end mt-4">
          <v-btn color="secondary" @click="nextQuiz">次の問題へ</v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import QuizCard from "./components/QuizCard.vue";
  import students from "./data/students.json";
  import type { Student } from "./types";

  const currentStudent = ref<Student | null>(null);

  const nextQuiz = () => {
    currentStudent.value = students[Math.floor(Math.random() * students.length)];
  };

  onMounted(nextQuiz);
</script>
