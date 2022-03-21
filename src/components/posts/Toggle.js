import { Button } from "@mui/material";
import React from "react";

function Toggle({ toggle, handleClick }) {
  return (
    <div>
      <Button
      type="button"
        variant={toggle ? "contained" : "text"}
        sx={{
          width: "50%",
          borderRadius: "3px",
          mt: 2,
          p: 1,
        }}
        onClick={() => handleClick(true)}
      >
        Tạo bài viết mới
      </Button>
      <Button
      type="button"

        variant={!toggle ? "contained" : "text"}
        sx={{
          width: "50%",
          borderRadius: "3px",
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
