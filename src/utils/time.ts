import type { Item } from "@/stores/radio";

function getDurationInSeconds(duration: string): number {
  const [h, m, s] = duration.split(":").map((v) => Number(v));

  return h * 60 * 60 + m * 60 + s;
}

export function getPlayedSeconds(item: Item): number {
  const now = +new Date();
  const start = +new Date(item.time);

  let played = (now - start) / 1000;
  const duration = getDurationInSeconds(item.duration);

  if (played > duration) {
    played -= duration;

    return played;
  }

  return played;
}

export function getPlayedTime(item: Item): string {
  const sec = getPlayedSeconds(item);

  let hours: number | string = Math.floor(sec / 3600);
  let minutes: number | string = Math.floor((sec - hours * 3600) / 60);
  let seconds: number | string = Math.round(sec - hours * 3600 - minutes * 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export function getPlayedPercentage(item: Item) {
  return (getPlayedSeconds(item) / getDurationInSeconds(item.duration)) * 100;
}
