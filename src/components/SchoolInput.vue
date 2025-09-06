<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select v-model="selection" :items="schools" label="所属校" :clearable="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import schools from "../data/schools.json";

  const selection = defineModel<string | null>({ default: null });
</script>
