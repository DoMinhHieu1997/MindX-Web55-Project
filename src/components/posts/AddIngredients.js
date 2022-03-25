import { AddCircleOutline } from "@mui/icons-material";
import { Button, Card, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function AddIngredients({ label, setCardItem, cardItem }, ref) {
  const [nameIngredient, setIngredient] = useState("");
  const [total, setTotal] = useState(1);
  const [error, setError] = useState(false);
  const handleBtnAdd = () => {
    if (nameIngredient 
      // && total
      ) {
      setCardItem((prev) => [...prev, { nameIngredient, total:1}]);
      setError(false);
      setIngredient("");
      setTotal("");
    } else {
      setError({
        ingredienError: !nameIngredient,
        // totalError: !total,
      });
    }
  };
  return (
    <div className="my-4">
      <div sx={{ m: "10px 0" }} elevation={4}>
        <Box sx={{ display: "flex", flexWrap: "wrap", }}>
          <TextField
            sx={{ mt: 1, height: 50, width: 310 ,mr:5}}
            ref={ref}
            value={nameIngredient}
            label={
              (error?.ingredienError || label) && !cardItem[0]
                ? "Vui lòng nhập nguyên liệu"
                : "Thêm nguyên liệu"
            }
            size="small"
            onChange={(e) => setIngredient(e.target.value)}
            error={(error?.ingredienError || label) && !cardItem[0]}
          />
          <TextField
            sx={{ width: 295, mt: 1, height: 50 ,display:'none'}}
            label={
              (error?.totalError || label) && !cardItem[0]
                ? "Nhập số lượng"
                : "Số lượng"
            }
            size="small"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            type="number"
            error={(error?.totalError || label) && !cardItem[0]}
          />
        <Button
          type="button"
          variant="contained"
          onClick={handleBtnAdd}
          sx={{ width: 310,  mb: 2, mt: 1 }}
        >
          Thêm
        </Button>
        </Box>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          fontFamily: `Roboto ,sans-serif`,
        }}
      >
        {cardItem.map(({ nameIngredient, total, unit }, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: 140,
                minHeight: 60,
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
                {/* {total}  */}
              </Card>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}

export default React.forwardRef(AddIngredients);
