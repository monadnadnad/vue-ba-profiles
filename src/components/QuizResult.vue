<template>
  <div v-if="isCorrect !== null" class="result-container">
    <v-alert
      :type="isCorrect ? 'success' : 'error'"
      :icon="isCorrect ? '$success' : '$error'"
      :title="isCorrect ? 'Correct!' : 'Incorrect'"
      variant="tonal"
    >
      <template v-if="!isCorrect">
        {{ userAnswer?.month }}-{{ userAnswer?.day }}
        is incorrect. The correct answer is
        {{ correctAnswer }}
      </template>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
  import type { BirthdaySelection } from "../models/quiz";

  defineProps<{
    isCorrect: boolean | null;
    correctAnswer?: string;
    userAnswer?: BirthdaySelection;
  }>();
</script>
