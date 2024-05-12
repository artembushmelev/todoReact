import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";

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
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      <List>
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
            <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
              <div>
                <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                <EditableSpan
                  oldTitle={t.title}
                  updateItem={(newTitle) => updateTaskHandler(t.id, newTitle)}
                />
              </div>
              <IconButton onClick={onClickHandler}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={filterButtonsContainerSx}>
        <Button
          onClick={onAllClickHandler}
          variant={props.filter === "all" ? "contained" : "outlined"}
        >
          All
        </Button>
        <Button
          onClick={onActiveClickHandler}
          variant={props.filter === "active" ? "contained" : "outlined"}
        >
          Active
        </Button>
        <Button
          onClick={onCompletedClickHandler}
          variant={props.filter === "completed" ? "contained" : "outlined"}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
}
