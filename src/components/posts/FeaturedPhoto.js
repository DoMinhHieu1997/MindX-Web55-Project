import { Add } from "@mui/icons-material";
import { Box, Fab, Paper } from "@mui/material";
import React, { useState } from "react";

function FeaturedPhoto({ onChangeFile, ...props }, ref) {
  const [imgPreview, setImgPreview] = useState(null);
  const handleInputIMG = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    file && reader.readAsDataURL(file);
    onChangeFile(e.target.files[0]);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            height: 128,
          },
        }}
      >
        <Paper elevation={3}>
          <img src={imgPreview} alt="" width={imgPreview || 128} height={128} />
        </Paper>
        <label htmlFor="upload-photo">
          <input
            ref={ref}
            style={{ display: "none" }}
            type="file"
            name="upload-photo"
            id="upload-photo"
            onChange={handleInputIMG}
          />
          <Fab
            color="primary"
            size="small"
            variant="extended"
            aria-label="add"
            component="span"
            sx={{ m: "18px 0" }}
          >
            <Add /> Chọn ảnh
          </Fab>
          <p>Tải ảnh đại diện cho bài viết</p>
        </label>
      </Box>
    </div>
  );
}

export default React.forwardRef(FeaturedPhoto);
