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
  isChecked: boolean;
  index: number;
  dayOfTheWeek: string;
  setDailyTasks: Dispatch<SetStateAction<TaskType[]>>;
}

export function Task({
  text,
  isChecked,
  index,
  dayOfTheWeek,
  setDailyTasks,
}: InputType) {
  const [isOnEditMode, setIsOnEditMode] = useState(true);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);
  const [taskPlaceholder, setTaskPlaceholder] = useState("");
  const [check, setCheck] = useState(isChecked);

  useEffect(() => {
    //to do: fix focus sunday on mount
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setDailyTasks((prevTasks): TaskType[] => {
      const t = [...prevTasks];
      t[index].isChecked = check;
      return t;
    });
  }, [index, setDailyTasks, check]);

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyboardKey: string = e.key;

    if (keyboardKey == "Enter") {
      if (!taskHasSibbling(index + 1)) {
        setDailyTasks((prevTasks): TaskType[] => {
          const t = [...prevTasks];
          t.push({
            taskName: "",
            isChecked: false,
          });
          return t;
        });
      }

      setIsOnEditMode(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userText: string = (e.target as HTMLInputElement).value;

    setDailyTasks((prevTasks): TaskType[] => {
      const t = [...prevTasks];
      t[index].taskName = userText;
      return t;
    });
  };

  const handleCheckboxChange = () => {
    setCheck((prevCheck) => !prevCheck);
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
    setDailyTasks((prevTasks): TaskType[] => {
      const t = [...prevTasks];
      const filteredTasks = t.filter((_, i) => i !== index);

      if (filteredTasks.length === 0) {
        filteredTasks.push({
          taskName: DEFAULT_TASK_TEXT,
          isChecked: false,
        });
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
        <div className="card__input">
          <input
            className="card__input--checkbox"
            type="checkbox"
            id={`checkbox-${index}`}
            checked={check}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`checkbox-${index}`}>
            <input
              type="text"
              className="card__input--text"
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
          </label>
        </div>
        <div className="card__input--delete" onClick={deleteTask} />
      </div>
    </>
  );
}
