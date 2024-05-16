import { FilterValuesType, TodolistsType } from "../App";
import { v1 } from "uuid";

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
  | ChangeTodolistFilterActionType;

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
      return state; // логика по добавлению тудулиста
    }
    default:
      return state;
  }
};
