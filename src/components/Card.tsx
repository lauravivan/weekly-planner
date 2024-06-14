import { useState, useRef, RefObject, useEffect } from "react";
import { getTasksByIndex, addTask, updateTask, deleteTask } from "../util";
import { useIsMount } from "../hooks";

type CardProps = {
  dayOfTheWeek: string;
};

export function Card({ dayOfTheWeek }: CardProps) {
  const [tasks, setTasks] = useState(() => getTasksByIndex(dayOfTheWeek));
  const [readOnly, setReadOnly] = useState(false);
  const lastTask: RefObject<HTMLInputElement> = useRef(null);
  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      if (lastTask && lastTask.current) {
        lastTask.current.focus();
      }
    }
  }, [isMount, tasks.length]);

  const handleInputEnter = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyboardKey: string = e.key;
    const userText: string = (e.target as HTMLInputElement).value;

    updateTask(dayOfTheWeek, index, userText);

    if (keyboardKey == "Enter" && userText) {
      if (!taskHasSibbling(index + 1)) {
        addTask(dayOfTheWeek);
      }

      setTasks(() => getTasksByIndex(dayOfTheWeek));
      setReadOnly(true);
    }
  };

  const handleInputFocus = () => {
    setReadOnly(false);
  };

  const taskHasSibbling = (sibblingIndex: number): boolean => {
    const t = getTasksByIndex(dayOfTheWeek);
    const sibbling = t[sibblingIndex];

    return sibbling ? true : false;
  };

  const handleInputClick = (index: number) => {
    deleteTask(dayOfTheWeek, index);
    setTasks(() => getTasksByIndex(dayOfTheWeek));
  };

  return (
    <div className="card">
      <div className="card__header">{dayOfTheWeek}</div>
      <div className="card__content">
        <form className="card__form" onSubmit={(e) => e.preventDefault()}>
          {tasks.map((text: string, index: number) => (
            <div className="card__input-wrapper" key={index}>
              <input
                type="text"
                className="card__input"
                placeholder={text}
                defaultValue={text}
                onKeyDown={handleInputEnter.bind(self, index)}
                readOnly={readOnly}
                key={`input-${index}`}
                onFocus={handleInputFocus}
                ref={
                  taskHasSibbling(index - 1) && index === tasks.length - 1
                    ? lastTask
                    : null
                }
                maxLength={40}
                title={text}
                onClick={handleInputClick.bind(self, index)}
              />
              <div className="card__input--delete" key={`delete-${index}`} />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
