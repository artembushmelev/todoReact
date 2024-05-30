import { FilterValuesType, TodolistsType } from "../App";
import { v1 } from "uuid";
import { RemoveTaskActionType } from "./tasks-reducer";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
    todolistId: string;
  };
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterValuesType;
  };
};

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | AddTodolistActionType;

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistsType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const todolistReducer = (
  state: TodolistsType[] = initialState,
  action: ActionsType
): TodolistsType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.payload.id); // логика по удалению тудулиста
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: action.payload.todolistId,
          title: action.payload.title,
          filter: "all",
        },
      ]; // логика по добавлению тудулиста
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) =>
        el.id === action.payload.id
          ? { ...el, title: action.payload.title }
          : el
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) =>
        el.id === action.payload.id
          ? { ...el, filter: action.payload.filter }
          : el
      );
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      id,
    },
  } as const;
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todolistId: v1(),
    },
  } as const;
};

export const ChangeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id,
      title,
    },
  } as const;
};
export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id,
      filter,
    },
  } as const;
};
