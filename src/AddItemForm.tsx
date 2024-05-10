import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Box from "@mui/material/Box";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addItemHandler();
    }
  };

  const buttonStyles = {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    background: "red",
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        id="filled-basic"
        label="Enter a title"
        variant="filled"
        size={"small"}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler}>
        +
      </IconButton>
    </Box>
  );
};
