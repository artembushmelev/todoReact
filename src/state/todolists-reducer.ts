import { v1 } from "uuid";
import { TodolistType, todolistsAPI } from "../api/todolists-api";
import { Dispatch } from "redux";

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [{ ...action.todolist, filter: "all" }, ...state];
    }
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todo) => (todo.id === action.id ? { ...todo, title: action.title } : todo));

    case "CHANGE-TODOLIST-FILTER":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, filter: action.filter } : todo
      );

    case "SET-TODOLISTS":
      return action.todos.map((tl) => ({ ...tl, filter: "all" }));

    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", id: todolistId } as const;
};
export const addTodolistAC = (todolist: TodolistType) => {
  return { type: "ADD-TODOLIST", todolist } as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title } as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter } as const;
};

export const SetTodosAC = (todos: TodolistType[]) =>
  ({
    type: "SET-TODOLISTS",
    todos: todos,
  } as const);

export const getTodosTС = () => {
  return (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsAPI.getTodolists().then((res) => {
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(SetTodosAC(res.data));
    });
  };
};

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
    });
  };
};

export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
    });
  };
};

/// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodosType = ReturnType<typeof SetTodosAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodosType;

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};
