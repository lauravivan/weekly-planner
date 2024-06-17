import { DEFAULT_TASK_TEXT, getDayOfTheWeek } from "../util";

export function addTask(dayOfTheWeek: string, text?: string) {
  const weekTasks: Array<string[]> = getWeekTasks();
  const weekIndex: number = getDayOfTheWeek(dayOfTheWeek);
  const taskText = text || "";

  weekTasks[weekIndex].push(taskText);

  localStorage.setItem("tasks", JSON.stringify(weekTasks));
}

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

export function updateTask(
  dayOfTheWeek: string,
  index: number,
  newValue: string
) {
  const weekTasks: Array<string[]> = getWeekTasks();
  const weekIndex: number = getDayOfTheWeek(dayOfTheWeek);

  weekTasks[weekIndex][index] = newValue;

  localStorage.setItem("tasks", JSON.stringify(weekTasks));
}

export function deleteTask(dayOfTheWeek: string, indexToRemove: number) {
  const weekTasks: Array<string[]> = getWeekTasks();
  const weekIndex: number = getDayOfTheWeek(dayOfTheWeek);

  if (indexToRemove >= 0 && indexToRemove < weekTasks[weekIndex].length) {
    weekTasks[weekIndex].splice(indexToRemove, 1);
  }

  localStorage.setItem("tasks", JSON.stringify(weekTasks));

  if (weekTasks[weekIndex].length === 0) {
    addTask(dayOfTheWeek, DEFAULT_TASK_TEXT);
  }
}
