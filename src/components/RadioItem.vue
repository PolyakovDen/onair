<script lang="ts" setup>
import { computed, toRefs } from "vue";

import type { Item } from "@/stores/radio";
import { getPlayedTime, getPlayedPercentage } from "@/utils/time";

import image from "@/assets/image.png";

interface Props {
  item: Item;
}

const props = defineProps<Props>();

const { item } = toRefs(props);

const isPlaying = computed(() => item.value.status === "playing");
const time = computed(() => new Date(item.value.time).toLocaleTimeString());
const played = computed(() => getPlayedTime(item.value));
const percentage = computed(() => getPlayedPercentage(item.value));
</script>

<template>
  <div
    class="radio-item d-flex flex-wrap"
    :class="{ 'radio-item_playing': isPlaying }"
  >
    <div class="radio-item__image d-flex justify-center align-center">
      <img :src="item.imageUrl || image" alt="Radio" />
    </div>
    <div class="radio-item__details d-flex justify-center flex-column">
      <div class="radio-item__title">{{ item.title }}</div>
      <div class="radio-item__artist">{{ item.artist }}</div>
      <div class="radio-item__time">Started at {{ time }}</div>
      <a class="radio-item__album" target="_blank" :href="item.iTunesTrackUrl">
        Open album
      </a>
    </div>

    <div v-if="isPlaying" class="item-progress d-flex align-center">
      <div class="item-progress__played">{{ played }}</div>
      <div class="item-progress-bar">
        <div class="item-progress-bar__full"></div>
        <div
          :style="{ width: `${percentage}%` }"
          class="item-progress-bar__filled"
        ></div>
      </div>
      <div class="item-progress__duration">
        {{ item.duration }}
      </div>
    </div>
  </div>
</template>
