<template>
  <div class="d-flex align-center">
    <v-text-field v-model="modelValue.userMM" placeholder="月" variant="outlined" density="compact" hide-details />
    <span class="mx-2">/</span>
    <v-text-field v-model="modelValue.userDD" placeholder="日" variant="outlined" density="compact" hide-details />
  </div>
</template>

<script setup lang="ts">
import type { MMDDQuiz } from "../types";

const modelValue = defineModel<MMDDQuiz>({
  default: { userMM: "", userDD: "" },
});
</script>
