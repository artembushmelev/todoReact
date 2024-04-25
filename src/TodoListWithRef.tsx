import { useRef } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  addTask: (value: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export const TodoList = (props: TodoListPropsType) => {


const taskTitleInput = useRef<HTMLInputElement>(null);

const onClickAddTaskHandler = () => {
    if (taskTitleInput.current) {
      const newTaskTitle = taskTitleInput.current?.value;
      props.addTask(newTaskTitle);
      taskTitleInput.current.value = "";
    }
  };

  return (
    <div className="">
      <h3>{props.title || "Today"}</h3>
      <div>
        <input ref={taskTitleInput} />
        <button onClick={onClickAddTaskHandler}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          return (
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  props.removeTask(t.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
