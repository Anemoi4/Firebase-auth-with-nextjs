export default function getCurrentTime() {
  const hours = new Date().getHours();
  let time: string;
  if (hours < 12 && hours >= 6) {
    time = "morning";
  } else if (hours < 18 && hours >= 12) {
    time = "afternoon";
  } else if (hours < 23 && hours >= 18) {
    time = "evening";
  } else if (hours >= 0 && hours < 6) {
    time = "night";
  }
  return time;
}
