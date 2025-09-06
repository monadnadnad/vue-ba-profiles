<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select v-model="selection.month" :items="months" label="月" :clearable="true" />
      </v-col>
      <v-col cols="6">
        <v-select v-model="selection.day" :items="days" label="日" :clearable="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import type { BirthdaySelection } from "../models/quiz";

  const selection = defineModel<BirthdaySelection>({ default: { month: null, day: null } });
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
</script>
