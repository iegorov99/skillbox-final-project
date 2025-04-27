export function getRuntime (runtime: number) {
  let hours = 0;
  do {
    runtime = runtime - 60;
    hours++;
  } while (runtime >= 60);

  if (hours > 0) {
    if (runtime != 0) return `${hours} ч ${runtime} мин`;
    else return `${hours} ч`;
  } else return `${runtime} мин`;

}