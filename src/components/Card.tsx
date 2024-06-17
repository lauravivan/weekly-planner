import { Input } from "./index";
import { getDayOfTheWeek, getWeekTasks } from "../util";
import { useState, useEffect } from "react";

type CardProps = {
  dayOfTheWeek: string;
};

export function Card({ dayOfTheWeek }: CardProps) {
  const [weekTasks, setWeekTasks] = useState(getWeekTasks());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(weekTasks));
  }, [weekTasks]);

  return (
    <div className="card">
      <div className="card__header">{dayOfTheWeek}</div>
      <div className="card__content">
        <form className="card__form" onSubmit={(e) => e.preventDefault()}>
          {weekTasks[getDayOfTheWeek(dayOfTheWeek)].map(
            (text: string, index: number) => (
              <Input
                text={text}
                index={index}
                dayOfTheWeek={dayOfTheWeek}
                setWeekTasks={setWeekTasks}
                key={index}
              />
            )
          )}
        </form>
      </div>
    </div>
  );
}
