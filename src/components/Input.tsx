import { useState, useRef, RefObject, useEffect } from "react";
import {
  DEFAULT_TASK_TEXT,
  addTask,
  updateTask,
  deleteTask,
  getDailyTasks,
} from "../util";

type InputType = {
  text: string;
  index: number;
  dayOfTheWeek: string;
  updateDailyTasks: () => void;
};

export function Input({
  text,
  index,
  dayOfTheWeek,
  updateDailyTasks,
}: InputType) {
  const [readOnly, setReadOnly] = useState(true);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const inputText = text || DEFAULT_TASK_TEXT;

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputEnter = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setTimeout(() => {
      const keyboardKey: string = e.key;
      const userText: string = (e.target as HTMLInputElement).value;

      updateTask(dayOfTheWeek, index, userText);

      if (keyboardKey == "Enter" && userText) {
        if (!taskHasSibbling(index + 1)) {
          addTask(dayOfTheWeek);
        }

        setReadOnly(true);
        insertReadOnly(true);
      }

      updateDailyTasks();
    }, 250);
  };

  const handleInputFocus = () => {
    insertPlaceholder(DEFAULT_TASK_TEXT);
    setReadOnly(false);
    insertReadOnly(false);
  };

  const handleInputHover = () => {
    insertPlaceholder(DEFAULT_TASK_TEXT);
    setReadOnly(true);
  };

  const handleInputUnhover = () => {
    insertPlaceholder("");
    setReadOnly(true);
    insertReadOnly(true);
  };

  const handleTaskDelete = (index: number) => {
    deleteTask(dayOfTheWeek, index);
    updateDailyTasks();
  };

  const insertPlaceholder = (text: string) => {
    if (inputRef && inputRef.current) {
      inputRef.current.placeholder = text;
    }
  };

  const insertReadOnly = (readOnly: boolean) => {
    if (inputRef && inputRef.current) {
      inputRef.current.readOnly = readOnly;
    }
  };

  const taskHasSibbling = (sibblingIndex: number): boolean => {
    const dailyTasks = getDailyTasks(dayOfTheWeek);
    const sibbling = dailyTasks[sibblingIndex];

    return sibbling ? true : false;
  };

  return (
    <div
      className={`${
        readOnly
          ? "card__input-wrapper--readonly"
          : "card__input-wrapper--editmode"
      } card__input-wrapper`}
      key={index}
      onMouseOver={handleInputHover}
      onMouseOut={handleInputUnhover}
    >
      <input
        type="text"
        className="card__input"
        placeholder={inputText}
        defaultValue={text}
        onKeyDown={handleInputEnter.bind(self, index)}
        onClick={handleInputFocus}
        maxLength={40}
        title={text}
        ref={inputRef}
      />
      <div
        className="card__input--delete"
        onClick={handleTaskDelete.bind(self, index)}
        key={`delete-${index}`}
      />
    </div>
  );
}
