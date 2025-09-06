<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select v-model="selectedMonth" :items="months" label="月"></v-select>
      </v-col>
      <v-col cols="6">
        <v-select v-model="selectedDay" :items="days" label="日"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import type { BirthdaySelection } from "../models/quiz";

  const selection = defineModel<BirthdaySelection>({ default: { month: null, day: null } });

  const selectedMonth = ref<number | null>(null);
  const selectedDay = ref<number | null>(null);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  watch([selectedMonth, selectedDay], () => {
    selection.value = { month: selectedMonth.value, day: selectedDay.value };
  });
</script>
