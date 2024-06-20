import {
  useState,
  useRef,
  RefObject,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { DEFAULT_TASK_TEXT, getDailyTasks } from "../util";

interface InputType {
  text: string;
  index: number;
  dayOfTheWeek: string;
  setDailyTasks: Dispatch<SetStateAction<string[]>>;
}

export function Input({ text, index, dayOfTheWeek, setDailyTasks }: InputType) {
  const [isOnEditMode, setIsOnEditMode] = useState(true);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [taskPlaceholder, setTaskPlaceholder] = useState("");

  useEffect(() => {
    //to do: fix focus sunday on mount
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyboardKey: string = e.key;

    if (keyboardKey == "Enter") {
      if (!taskHasSibbling(index + 1)) {
        setDailyTasks((prevTasks): string[] => {
          const t = [...prevTasks];
          t.push("");
          return t;
        });
      }

      setIsOnEditMode(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userText: string = (e.target as HTMLInputElement).value;

    setDailyTasks((prevTasks): string[] => {
      const t = [...prevTasks];
      t[index] = userText;
      return t;
    });
  };

  const handleInputFocus = () => {
    setTaskPlaceholder(DEFAULT_TASK_TEXT);
    setIsOnEditMode(true);
  };

  const handleInputUnhover = () => {
    setTaskPlaceholder("");
    setIsOnEditMode(false);
  };

  const taskHasSibbling = (sibblingIndex: number): boolean => {
    const dailyTasks = getDailyTasks(dayOfTheWeek);

    if (sibblingIndex >= 0 && sibblingIndex < dailyTasks.length) {
      return true;
    }

    return false;
  };

  const deleteTask = () => {
    setDailyTasks((prevTasks): string[] => {
      const t = [...prevTasks];
      const filteredTasks = t.filter((_, i) => i !== index);

      if (filteredTasks.length === 0) {
        filteredTasks.push(DEFAULT_TASK_TEXT);
      }

      return filteredTasks;
    });
  };

  return (
    <>
      <div
        className={`${
          isOnEditMode
            ? "card__input-wrapper--editmode"
            : "card__input-wrapper--readonly"
        } card__input-wrapper`}
        onMouseOver={() => setTaskPlaceholder(DEFAULT_TASK_TEXT)}
        onMouseOut={handleInputUnhover}
      >
        <input
          type="text"
          className="card__input"
          placeholder={taskPlaceholder}
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleInputEnter}
          maxLength={40}
          title={text}
          ref={inputRef}
          onClick={handleInputFocus}
          readOnly={!isOnEditMode}
        />
        <div className="card__input--delete" onClick={deleteTask} />
      </div>
    </>
  );
}
