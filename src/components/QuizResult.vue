<template>
  <div v-if="isCorrect !== null" class="result-container">
    <v-alert :type="alertType" :title="alertTitle" variant="tonal">
      <div v-for="r in results" :key="r.key" class="mb-1">
        <span class="mr-1">{{ r.ok ? "✅" : "❌" }}</span>
        <strong>{{ r.label }}:</strong>
        <span class="ml-1">{{ formatUserInput(r) }}</span>
        <span v-if="!r.ok" class="ml-1">→ 正: {{ formatCorrect(r) }}</span>
      </div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { ResultField, ResultPayload } from "../models/quiz";

  const props = defineProps<{
    isCorrect: boolean | null;
    results: ResultPayload;
  }>();

  const anyCorrect = computed(() => props.results.some((r) => r.ok));
  const allCorrect = computed(() => props.results.length > 0 && props.results.every((r) => r.ok));
  const alertType = computed(() => (allCorrect.value ? "success" : anyCorrect.value ? "warning" : "error"));
  const alertTitle = computed(() => (allCorrect.value ? "正解" : anyCorrect.value ? "一部正解" : "不正解"));

  const formatUserInput = (r: ResultField) => {
    if (r.key === "birthday") {
      const m = r.userInput.month;
      const d = r.userInput.day;
      return m && d ? `${m}/${d}` : "未選択";
    }
    return r.userInput ?? "未選択";
  };
  const formatCorrect = (r: ResultField) => r.correct;
</script>
