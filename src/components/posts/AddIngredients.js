import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";

function AddIngredients() {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const refIng = useRef("");
  const arrSearch = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    inputValue,
  ];
  const handleBtn = () => {};
  console.log('value',value,'/', inputValue);
  return (
    <div>
      <Paper sx={{ m: "10px 0" }} elevation={4}>
        <Box sx={{ display: "flex", p: 2 }}>
          <Autocomplete
            disablePortal
            value={value}
            inputValue={inputValue}
            options={arrSearch}
            sx={{ width: 300 }}
            onChange={(e, newValue) => {
              setValue(e.target.value);
            }}
            onInputChange={(e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Thêm nguyên liệu" size="small" />
            )}
          />
          <TextField
            sx={{ ml: 2, width: 150 }}
            label="Số lượng"
            size="small"
            onChange={() => {}}
            type="number"
            value={refIng.current.AddIngredients}
          />
        </Box>
        <Button
          type="button"
          variant="contained"
          onClick={handleBtn}
          sx={{ width: 208, ml: 2, mb: 2 }}
        >
          Thêm
        </Button>
      </Paper>
      <div id="add-item"></div>
    </div>
  );
}

export default AddIngredients;
