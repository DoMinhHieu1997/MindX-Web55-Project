import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";

function FeaturedPhoto({ onChange }) {
  const [imgPreview, setImgPreview] = useState(null);
  const handleInputIMG = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
    onChange(e.target.files[0]);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper elevation={3}>
          <img src={imgPreview} alt="" width={128} />
        </Paper>
        <div>
          <input type="file" name="" id="" onChange={handleInputIMG} />
          <label>Tải ảnh đại diện cho bài viết</label>
        </div>
      </Box>
    </div>
  );
}

export default FeaturedPhoto;
