import { DEFAULT_TASK_TEXT, getDayOfTheWeek } from "../util";

export function getWeekTasks(): Array<TaskType[]> {
  const weekTasks: Array<TaskType[]> =
    JSON.parse(localStorage.getItem("tasks")!) ||
    Array.from({ length: 7 }, () => [
      {
        taskName: DEFAULT_TASK_TEXT,
        isChecked: false,
      },
    ]);

  return weekTasks;
}

export function getDailyTasks(dayOfTheWeek: string): Array<TaskType> {
  const weekTasks: Array<TaskType[]> = getWeekTasks();
  const weekIndex: number = getDayOfTheWeek(dayOfTheWeek);
  const dailyTasks: Array<TaskType> = weekTasks[weekIndex];

  return dailyTasks;
}
