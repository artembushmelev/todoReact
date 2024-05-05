import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");

  const onActiveClickHandler = () =>
    props.changeFilter(props.todolistId, "active");

  const onCompletedClickHandler = () =>
    props.changeFilter(props.todolistId, "completed");

  const removeTodolistHandler = () => {
    props.removeTodoList(props.todolistId);
  };

  const addTaskHandler = (title: string) => {
    props.addTask(props.todolistId, title);
  };
  const updateTodolistHandler = (newTitle: string) => {
    props.updateTodolist(props.todolistId, newTitle);
  };

  const updateTaskHandler = (taskId: string, newTitle: string) => {
    props.updateTask(props.todolistId, taskId, newTitle);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          oldTitle={props.title}
          updateItem={updateTodolistHandler}
        />
        <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(props.todolistId, t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              props.todolistId,
              t.id,
              e.currentTarget.checked
            );
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <EditableSpan
                oldTitle={t.title}
                updateItem={(newTitle) => updateTaskHandler(t.id, newTitle)}
              />
              <button onClick={onClickHandler}>x</button>
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
}
