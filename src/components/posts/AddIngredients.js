import { AddCircleOutline } from "@mui/icons-material";
import { Button, Card, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Myp } from "../profile/Register";

function AddIngredients({ label, setCardItem, cardItem }, ref) {
  const [nameIngredient, setIngredient] = useState("");
  const [total, setTotal] = useState("");
  // const [cardItem, setCardItem] = useState([]);
  const [error, setError] = useState(false);
  const handleBtnAdd = () => {
    if (nameIngredient && total) {
      setCardItem((prev) => [...prev, { nameIngredient, total }]);
      setError(false);
    } else {
      setError({ ingredienError: !nameIngredient, totalError: !total });
    }
  };

  console.log(label);
  return (
    <div className="my-4">
      <Paper sx={{ m: "10px 0" }} elevation={4}>
        <Box sx={{ display: "flex", p: 2, height: 80 }}>
          <TextField
            ref={ref}
            label="Thêm nguyên liệu"
            size="small"
            onChange={(e) => setIngredient(e.target.value)}
            helperText={
              (error?.ingredienError || label) && <Myp>Nhập nguyên liệu</Myp>
            }
          />
          <TextField
            sx={{ ml: 2, width: 150 }}
            label="Số lượng"
            size="small"
            onChange={(e) => setTotal(e.target.value)}
            type="number"
            helperText={
              (error?.totalError || label) && <Myp>Nhập số lượng</Myp>
            }
          />
        </Box>
        <Button
          type="button"
          variant="contained"
          onClick={handleBtnAdd}
          sx={{ width: 208, ml: 2, mb: 2 }}
        >
          Thêm
        </Button>{" "}
        {/* {label} */}
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          fontFamily: `Roboto ,sans-serif`,
        }}
      >
        {cardItem.map(({ nameIngredient, total }, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: 150,
                height: 60,
                m: 1,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                lineHeight: "100%",
                overflow: "revert",
                bgcolor: "#eee",
              }}
            >
              <AddCircleOutline
                fontSize="large"
                onClick={(e) => {
                  cardItem.splice(index, 1);
                  setCardItem([...cardItem]);
                }}
                sx={{
                  fontWeight: 700,
                  color: "#666",
                  position: "absolute",
                  top: -15,
                  right: -15,
                  transform: "rotate(45deg)",
                }}
              />
              <Box
                sx={{
                  p: 2,
                  fontWeight: "500",
                  lineHeight: "100%",
                  fontSize: "1.1rem",
                }}
              >
                {nameIngredient}
              </Box>
              <Card
                sx={{
                  bgcolor: "#aaa",
                  color: "white",
                  p: "0 8px",
                  borderRadius: 11,
                  fontSize: 12,
                  position: "absolute",
                  bottom: -10,
                  left: 16,
                }}
              >
                {total}
              </Card>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}

export default React.forwardRef(AddIngredients);
