import { getDayOfTheWeek, DEFAULT_TASK_TEXT } from "./index";

export function addTask(dayOfTheWeek: string) {
  const tasks: Array<string[]> = getTasks();
  const indexTasks: number = getDayOfTheWeek(dayOfTheWeek) - 1;

  tasks[indexTasks].push(DEFAULT_TASK_TEXT);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks(): Array<string[]> {
  const tasks: Array<string[]> =
    JSON.parse(localStorage.getItem("tasks")!) ||
    Array.from({ length: 7 }, () => [DEFAULT_TASK_TEXT]);

  return tasks;
}

export function getTasksByIndex(dayOfTheWeek: string): Array<string> {
  const tasks: Array<string[]> = getTasks();

  const index: number = getDayOfTheWeek(dayOfTheWeek) - 1;

  const tasksOfTheDay: Array<string> = tasks[index];

  return tasksOfTheDay;
}

export function updateTask(
  dayOfTheWeek: string,
  index: number,
  newValue: string
) {
  const tasks: Array<string[]> = getTasks();
  const indexTasks: number = getDayOfTheWeek(dayOfTheWeek) - 1;

  tasks[indexTasks][index] = newValue;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
