<template>
  <v-autocomplete
    v-if="modelValue"
    v-model="modelValue.userChoice"
    :items="items"
    variant="outlined"
    density="compact"
    hide-details
  />
</template>

<script setup lang="ts">
  import type { ChoiceQuiz } from "../types";

  defineProps<{
    items: string[];
  }>();

  const modelValue = defineModel<ChoiceQuiz>();
</script>
