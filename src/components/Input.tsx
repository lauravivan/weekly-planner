import {
  useState,
  useRef,
  RefObject,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { DEFAULT_TASK_TEXT, getDailyTasks } from "../util";

type InputType = {
  text: string;
  index: number;
  dayOfTheWeek: string;
  setDailyTasks: Dispatch<SetStateAction<string[]>>;
};

export function Input({ text, index, dayOfTheWeek, setDailyTasks }: InputType) {
  const [readOnly, setReadOnly] = useState(true);
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputEnter = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();

    setTimeout(() => {
      const keyboardKey: string = e.key;
      const userText: string = (e.target as HTMLInputElement).value;

      updateTask(userText);

      if (keyboardKey == "Enter" && userText) {
        if (!taskHasSibbling(index + 1)) {
          addTask();
        }

        setReadOnly(true);
        insertReadOnly(true);
      }
    }, 250);
  };

  const handleInputFocus = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

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
    const sibbling = getDailyTasks(dayOfTheWeek)[sibblingIndex];
    return sibbling ? true : false;
  };

  const updateTask = (newValue: string) => {
    setDailyTasks((prevTasks): string[] => {
      const t = [...prevTasks];
      t[index] = newValue;
      return t;
    });
  };

  const addTask = (text?: string) => {
    const taskText: string = text || "";

    setDailyTasks((prevTasks): string[] => {
      const t = [...prevTasks];
      t.push(taskText);
      return t;
    });
  };

  const deleteTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setDailyTasks((prevTasks): string[] => {
      const t = [...prevTasks];
      const filteredTasks = t.filter((t) => t !== text);

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
          readOnly
            ? "card__input-wrapper--readonly"
            : "card__input-wrapper--editmode"
        } card__input-wrapper`}
        onMouseOver={handleInputHover}
        onMouseOut={handleInputUnhover}
      >
        <input
          type="text"
          className="card__input"
          placeholder={text || ""}
          defaultValue={text}
          value={text}
          onKeyDown={handleInputEnter.bind(self, index)}
          maxLength={40}
          title={text}
          ref={inputRef}
          onClick={handleInputFocus}
        />
        <div className="card__input--delete" onClick={deleteTask} />
      </div>
    </>
  );
}
