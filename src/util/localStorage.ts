import { DEFAULT_TASK_TEXT, getDayOfTheWeek } from "./index";

export function addTask(dayOfTheWeek: string, newTask: string) {
  const tasks = getTasks();

  const dayOfTheWeekNumber = getDayOfTheWeek(dayOfTheWeek);
}

export function getTasks(): string[] {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    return tasks;
  }

  return [DEFAULT_TASK_TEXT];
}
