<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from "vue";

import RadioItems from "./components/RadioItems.vue";

import { useRadioStore } from "@/stores/radio";

const radioStore = useRadioStore();

onBeforeMount(() => {
  radioStore.fetchItems();
  radioStore.startWatchingItems();
});

onBeforeUnmount(() => {
  radioStore.stopWatchingItems();
});
</script>

<template>
  <div class="app">
    <RadioItems />
  </div>
</template>
