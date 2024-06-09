import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TodolistsType } from "./App";
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
import { useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import { useDispatch } from "react-redux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./model/tasks-reducer";
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  removeTodolistAC,
} from "./model/todolists-reducer";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolist: TodolistsType;
};

export function TodolistWithRedax(props: PropsType) {
  const { id, title, filter } = props.todolist;

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[id]
  );

  const dispath = useDispatch();

  const onAllClickHandler = () => dispath(ChangeTodolistFilterAC(id, "all"));

  const onActiveClickHandler = () =>
    dispath(ChangeTodolistFilterAC(id, "active"));

  const onCompletedClickHandler = () =>
    dispath(ChangeTodolistFilterAC(id, "completed"));

  const removeTodolistHandler = () => {
    dispath(removeTodolistAC(id));
  };

  const addTaskHandler = (title: string) => {
    dispath(addTaskAC(title, id));
  };
  const changeTodolistTitle = (newTitle: string) => {
    dispath(ChangeTodolistTitleAC(id, newTitle));
  };

  const changeTaskTitle = (taskId: string, newTitle: string) => {
    dispath(changeTaskTitleAC(taskId, newTitle, id));
  };

  if (filter === "active") {
    tasks = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    tasks = tasks.filter((t) => t.isDone === true);
  }

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} updateItem={changeTodolistTitle} />
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} />
      <List>
        {tasks.map((t) => {
          const onClickHandler = () => dispath(removeTaskAC(id, t.id));
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispath(changeTaskStatusAC(t.id, e.currentTarget.checked, id));
          };

          return (
            <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
              <div>
                <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                <EditableSpan
                  oldTitle={t.title}
                  updateItem={(newTitle) => changeTaskTitle(t.id, newTitle)}
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
          variant={filter === "all" ? "contained" : "outlined"}
        >
          All
        </Button>
        <Button
          onClick={onActiveClickHandler}
          variant={filter === "active" ? "contained" : "outlined"}
        >
          Active
        </Button>
        <Button
          onClick={onCompletedClickHandler}
          variant={filter === "completed" ? "contained" : "outlined"}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
}
