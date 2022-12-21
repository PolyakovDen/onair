<script lang="ts" setup>
import { storeToRefs } from "pinia";

import RadioItem from "@/components/RadioItem.vue";

import { useRadioStore } from "@/stores/radio.js";

const radioStore = useRadioStore();
const { radioItems } = storeToRefs(radioStore);
</script>

<template>
  <div class="radio-items">
    <RadioItem v-for="(item, i) in radioItems" :key="i" :item="item" />
  </div>
</template>
