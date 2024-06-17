import { DEFAULT_TASK_TEXT, getDayOfTheWeek } from "../util";

export function getWeekTasks(): Array<string[]> {
  const weekTasks: Array<string[]> =
    JSON.parse(localStorage.getItem("tasks")!) ||
    Array.from({ length: 7 }, () => [DEFAULT_TASK_TEXT]);

  return weekTasks;
}

export function getDailyTasks(dayOfTheWeek: string): Array<string> {
  const weekTasks: Array<string[]> = getWeekTasks();
  const weekIndex: number = getDayOfTheWeek(dayOfTheWeek);
  const dailyTasks: Array<string> = weekTasks[weekIndex];

  return dailyTasks;
}
