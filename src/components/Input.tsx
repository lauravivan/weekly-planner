import {
  useState,
  useRef,
  RefObject,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import {
  DEFAULT_TASK_TEXT,
  getDailyTasks,
  getDayOfTheWeek,
  getWeekTasks,
} from "../util";

type InputType = {
  text: string;
  index: number;
  dayOfTheWeek: string;
  setWeekTasks: Dispatch<SetStateAction<string[][]>>;
};

export function Input({ text, index, dayOfTheWeek, setWeekTasks }: InputType) {
  const [readOnly, setReadOnly] = useState(true);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const inputText = text || DEFAULT_TASK_TEXT;

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  });

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
          addTask();
        }

        setReadOnly(true);
        insertReadOnly(true);
      }
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

  const updateTask = (
    dayOfTheWeek: string,
    index: number,
    newValue: string
  ) => {
    const weekTasks: string[][] = [...getWeekTasks()];

    weekTasks[getDayOfTheWeek(dayOfTheWeek)][index] = newValue;

    setWeekTasks(weekTasks);
  };

  const addTask = (text?: string) => {
    const weekTasks: string[][] = [...getWeekTasks()];
    const taskText: string = text || "";

    weekTasks[getDayOfTheWeek(dayOfTheWeek)].push(taskText);

    setWeekTasks(weekTasks);
  };

  const deleteTask = (dayOfTheWeek: string, indexToRemove: number) => {
    const weekTasks: string[][] = [...getWeekTasks()];
    const dailyTasksLength: number = getDailyTasks(dayOfTheWeek).length;

    if (indexToRemove >= 0 && indexToRemove < dailyTasksLength) {
      weekTasks[getDayOfTheWeek(dayOfTheWeek)].splice(indexToRemove, 1);
    }

    if (weekTasks[getDayOfTheWeek(dayOfTheWeek)].length === 0) {
      addTask(DEFAULT_TASK_TEXT);
    }

    setWeekTasks(weekTasks);
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
        onClick={deleteTask.bind(self, dayOfTheWeek, index)}
        key={`delete-${index}`}
      />
    </div>
  );
}
