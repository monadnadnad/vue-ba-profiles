<template>
  <v-app>
    <v-app-bar color="primary" density="compact" elevation="0">
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title> ブルアカの生徒を暗記する </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="showDrawer">
      <v-list>
        <v-list-subheader>穴埋めON/OFF</v-list-subheader>
        <v-list-item v-for="pref in quizableItems" :key="pref.key">
          <v-switch
            v-model="quizPrefs[pref.key]"
            :label="pref.label"
            color="primary"
            class="px-4"
            hide-details
          ></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <ProfileCard v-if="currentStudent" :key="currentStudent.Id" :student="currentStudent" :quiz-prefs="quizPrefs" />
        <div class="d-flex justify-end mt-4">
          <v-btn color="primary" @click="nextStudent">次の生徒へ</v-btn>
        </div>
      </v-container>
    </v-main>
    <v-footer class="pa-2 border-t" color="background">
      <div class="w-100 text-center text-caption text-medium-emphasis opacity-60">
        <p class="ma-0">本サイトはNexon Games Co., Ltd.、株式会社Yostarとは関係ありません。</p>
        <p class="ma-0">
          データは
          <a href="https://github.com/SchaleDB/SchaleDB" target="_blank" rel="noopener noreferrer"> SchaleDB </a>
          様のものを使用しています。
        </p>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ProfileCard from "./components/ProfileCard.vue";
import studentsData from "./data/students.json";
import type { QuizableKey, QuizPrefs, Student } from "./types";
import { keyToLabel } from "./utils";

const defaultQuizPrefs: QuizPrefs = {
  BirthDay: true,
  CharacterVoice: true,
  CharacterAge: false,
  CharHeightMetric: true,
  Hobby: false,
};
const students = studentsData as Student[];

const showDrawer = ref(false);
const currentStudent = ref<Student | null>(null);
const quizPrefs = ref<QuizPrefs>(defaultQuizPrefs);
const quizableItems: { key: QuizableKey; label: string }[] = [
  { key: "CharacterAge", label: keyToLabel["CharacterAge"] },
  { key: "CharHeightMetric", label: keyToLabel["CharHeightMetric"] },
  { key: "BirthDay", label: keyToLabel["BirthDay"] },
  { key: "Hobby", label: keyToLabel["Hobby"] },
  { key: "CharacterVoice", label: keyToLabel["CharacterVoice"] },
];

function nextStudent() {
  currentStudent.value = students[Math.floor(Math.random() * students.length)];
}

onMounted(nextStudent);
</script>
