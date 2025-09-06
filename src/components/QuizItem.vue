<template>
  <div>
    <component
      :is="quiz.type === 'select' ? 'v-select' : 'v-text-field'"
      v-model="answer"
      :label="quiz.label"
      :items="quiz.options"
      :disabled="isJudged"
    />
    <p v-if="isJudged" class="mt-n4 mb-2">
      <v-chip size="small" :color="result === 'correct' ? 'success' : 'error'">
        {{ result === "correct" ? "正解" : `不正解: ${correctAnswer}` }}
      </v-chip>
    </p>
  </div>
</template>

<script setup lang="ts">
  import type { Quiz, QuizResult } from "../quiz";
  import type { Student } from "../types";

  defineProps<{
    quiz: Quiz<keyof Student>;
    isJudged: boolean;
    result: QuizResult | null;
    correctAnswer: string;
  }>();

  const answer = defineModel<string>({ required: true });
</script>
