import { Button } from "@mui/material";
import React from "react";

function Toggle({ toggle, handleClick }) {
  return (
    <div>
      <Button
        variant={toggle ? "contained" : "text"}
        sx={{
          width: "50%",
          borderRadius: "30px",
          mt: 2,
          p: 1,
        }}
        onClick={() => handleClick(true)}
      >
        Tạo bài viết mới
      </Button>
      <Button
        variant={!toggle ? "contained" : "text"}
        sx={{
          width: "50%",
          borderRadius: "30px",
          mt: 2,
          p: 1,
        }}
        onClick={() => handleClick(false)}
      >
        thêm công thức
      </Button>
    </div>
  );
}

export default Toggle;
