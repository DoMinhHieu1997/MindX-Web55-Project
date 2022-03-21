import { Add } from "@mui/icons-material";
import { Box, Button,  Paper } from "@mui/material";
import React from "react";

function FeaturedPhoto(
  { onChangeFile, label, imgPreview, setImgPreview },
  ref
) {
  const handleInputIMG = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/png" || "image/gif" || "image/jpeg") {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      file && reader.readAsDataURL(file);
      onChangeFile(e.target.files[0]);
    } else {
      label = true;
      setImgPreview(null);
    }
  };
  
  return (
    <div className="mt-4">
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
        <div>
          <Button variant="contained" component="label" size="small">
            <Add fontSize="small" className="mb-1"/> Chọn ảnh
            <input
              ref={ref}
              accept="image/png, image/gif, image/jpeg"
              onChange={handleInputIMG}
              type="file"
              hidden
            />
          </Button>
          {label ? (
            <Paper
              sx={{ color: "#dc3545", boxShadow: "none", maxWidth: "180px" }}
            >
              Vui lòng tải ảnh đại diện cho bài viết
            </Paper>
          ) : (
            <p className="mt-2 text-secondary">Tải ảnh đại diện cho bài viết</p>
          )}
        </div>
      </Box>
    </div>
  );
}

export default React.forwardRef(FeaturedPhoto);
