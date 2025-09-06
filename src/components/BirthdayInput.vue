<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select v-model="month" :items="months" label="月" :clearable="true" />
      </v-col>
      <v-col cols="6">
        <v-select v-model="day" :items="days" label="日" :clearable="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { NA, type WithNA } from "../models/na";

  const modelMonth = defineModel<WithNA<number>>("month", { default: NA });
  const modelDay = defineModel<WithNA<number>>("day", { default: NA });

  const month = computed<number | null>({
    get: () => (modelMonth.value === NA ? null : (modelMonth.value as number)),
    set: (v) => (modelMonth.value = v == null ? NA : v),
  });
  const day = computed<number | null>({
    get: () => (modelDay.value === NA ? null : (modelDay.value as number)),
    set: (v) => (modelDay.value = v == null ? NA : v),
  });
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
</script>
