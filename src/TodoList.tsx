import { ChangeEvent, KeyboardEventHandler, useRef, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  addTask: (value: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodoList:(todolistId: string) => void
};

export const TodoList = (props: TodoListPropsType) => {

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !(taskTitle.trim() === "")) {
      props.addTask(taskTitle, props.id);
      setTaskTitle("");
    }
  };

  let [taskTitle, setTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onClickAddTaskHandler = () => {
    if (taskTitle.trim() === "") {
      setError("Title is");
      return;
    }
    props.addTask(taskTitle, props.id);
    setTaskTitle("");
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const removeTodoList = () => props.removeTodoList(props.id)

  return (
    <div className="">
      <h3>{props.title || "Today"}<button onClick={removeTodoList}>x</button></h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
          onKeyUp={onKeyPressHandler}
        />
        <button
          onClick={onClickAddTaskHandler}
          disabled={!taskTitle || !(taskTitle.length <= 15)} // disbled = false
        >
          +
        </button>
        {taskTitle.length > 5 && <div>stop</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id);
          };
          return (
            <li className={t.isDone === true ? "is-done" : ""}>
              <input  type="checkbox"
                      checked={t.isDone}
                      onChange={onChangeHandler}/>

              <span>
                {t.title}
              </span>
              <button
                onClick={() => {
                  props.removeTask(t.id , props.id);
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
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
