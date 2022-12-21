import { defineStore } from "pinia";
import axios from "axios";

export interface Item {
  artist: string;
  duration: string;
  iTunesTrackUrl: string;
  imageUrl: string;
  previewUrl: string;
  status: "playing" | "history";
  time: string;
  title: string;
}

const API_URL = "https://onair.radioapi.io/thisisgo/go/onair.json";

interface RadioStore {
  items: Item[];
  intervalId: number;
}

export const useRadioStore = defineStore("RadioStore", {
  state: (): RadioStore => {
    return {
      items: [],
      intervalId: 0,
    };
  },
  actions: {
    fetchItems() {
      axios
        .get(API_URL)
        .then((response) => (this.items = response.data.nowplaying));
    },
    startWatchingItems() {
      this.intervalId = setInterval(() => {
        this.fetchItems();
      }, 2 * 1000);
    },
    stopWatchingItems() {
      clearInterval(this.intervalId);
    },
  },
  getters: {
    radioItems(): Item[] {
      return this.items;
    },
    historyItems(): Item[] {
      return this.items
        .filter((item) => item.status === "history")
        .sort((a, b) => +new Date(b.time) - +new Date(a.time));
    },
    playingItems(): Item[] {
      return this.items.filter((item) => item.status === "playing");
    },
  },
});
