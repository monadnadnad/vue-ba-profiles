<template>
  <v-app>
    <v-main>
      <v-container>
        <ProfileCard
          v-if="currentStudent"
          :key="currentStudent.Id"
          :student="currentStudent"
          :all-students="students"
          :quiz-prefs="quizPrefs"
        />
        <div class="d-flex justify-end mt-4">
          <v-btn color="secondary" @click="nextStudent">次の生徒へ</v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import ProfileCard from "./components/ProfileCard.vue";
  import studentsData from "./data/students.json";
  import { defaultQuizPrefs, type QuizPrefs, type Student } from "./types";

  const students = studentsData as Student[];
  const currentStudent = ref<Student | null>(null);
  const quizPrefs = ref<QuizPrefs>(defaultQuizPrefs);

  const nextStudent = () => {
    currentStudent.value = students[Math.floor(Math.random() * students.length)];
  };

  onMounted(nextStudent);
</script>
