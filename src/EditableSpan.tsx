import TextField from "@mui/material/TextField";
import React, { ChangeEvent, useState } from "react";

type EditableSpan = {
  oldTitle: string;
  updateItem: (newTitle: string) => void;
};

export const EditableSpan = (props: EditableSpan) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(props.oldTitle);

  const activateEditModeHandler = () => {
    setEditMode(!editMode);
    if (editMode) {
      props.updateItem(newTitle);
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={newTitle}
      onBlur={activateEditModeHandler}
      onChange={changeTitleHandler}
      id="filled-basic"
      variant="filled"
      size={"small"}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditModeHandler}>{props.oldTitle}</span>
  );
};
