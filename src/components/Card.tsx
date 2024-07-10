import { Task } from "./index";
import { getDailyTasks, getDayOfTheWeek, getWeekTasks } from "../util";
import { useState, useEffect } from "react";

interface CardProps {
  dayOfTheWeek: string;
}

export function Card({ dayOfTheWeek }: CardProps) {
  const [dailyTasks, setDailyTasks] = useState(getDailyTasks(dayOfTheWeek));

  useEffect(() => {
    const weekTasks = [...getWeekTasks()];
    weekTasks[getDayOfTheWeek(dayOfTheWeek)] = dailyTasks;

    localStorage.setItem("tasks", JSON.stringify(weekTasks));
  }, [dailyTasks, dayOfTheWeek]);

  return (
    <div className="card">
      <div className="card__header">{dayOfTheWeek}</div>
      <div className="card__content">
        <form className="card__form" onSubmit={(e) => e.preventDefault()}>
          {dailyTasks.map((task: TaskType, index: number) => (
            <Task
              text={task.taskName}
              isChecked={task.isChecked}
              index={index}
              dayOfTheWeek={dayOfTheWeek}
              setDailyTasks={setDailyTasks}
              key={index}
            />
          ))}
        </form>
      </div>
    </div>
  );
}
