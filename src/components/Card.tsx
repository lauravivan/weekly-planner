import { Input } from "./index";
import { getDailyTasks } from "../util";
import { useState } from "react";

type CardProps = {
  dayOfTheWeek: string;
};

export function Card({ dayOfTheWeek }: CardProps) {
  const [dailyTasks, setDailyTasks] = useState(() =>
    getDailyTasks(dayOfTheWeek)
  );

  const updateDailyTasks = () => {
    setDailyTasks(() => getDailyTasks(dayOfTheWeek));
  };

  return (
    <div className="card">
      <div className="card__header">{dayOfTheWeek}</div>
      <div className="card__content">
        <form className="card__form" onSubmit={(e) => e.preventDefault()}>
          {dailyTasks.map((text: string, index: number) => (
            <Input
              text={text}
              index={index}
              dayOfTheWeek={dayOfTheWeek}
              updateDailyTasks={updateDailyTasks}
              key={index}
            />
          ))}
        </form>
      </div>
    </div>
  );
}
