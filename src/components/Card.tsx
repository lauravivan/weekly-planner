import { useState } from "react";
import { getTasksByIndex, addTask, updateTask } from "../util";

type CardProps = {
  dayOfTheWeek: string;
};

export function Card({ dayOfTheWeek }: CardProps) {
  const [tasks, setTasks] = useState(() => getTasksByIndex(dayOfTheWeek));
  const [isOnEditMode, setIsOnEditMode] = useState(true);

  const handleInputEnter = (index: number, e: object) => {
    const keyboardKey: string = e.key;
    const userText: string = e.target.value;

    if (keyboardKey == "Enter") {
      updateTask(dayOfTheWeek, index, userText);

      if (!taskHasSibbling(index)) {
        addTask(dayOfTheWeek);
      }

      setTasks(() => getTasksByIndex(dayOfTheWeek));
      setIsOnEditMode(true);
    }
  };

  const handleInputFocus = () => {
    setIsOnEditMode(false);
  };

  const taskHasSibbling = (index: number): boolean => {
    const t = getTasksByIndex(dayOfTheWeek);
    const sibbling = t[index + 1];

    return sibbling ? true : false;
  };

  return (
    <div className="card">
      <div className="card__header">{dayOfTheWeek}</div>
      <div className="card__content">
        <form className="card__form" onSubmit={(e) => e.preventDefault()}>
          {tasks.map((text: string, index: number) => (
            <input
              type="text"
              className="card__input"
              placeholder={text}
              onKeyDown={handleInputEnter.bind(self, index)}
              key={index}
              readOnly={isOnEditMode}
              onFocus={handleInputFocus}
            />
          ))}
        </form>
      </div>
    </div>
  );
}
