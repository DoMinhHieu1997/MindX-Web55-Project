import { Add } from "@mui/icons-material";
import { Box, Fab, Paper } from "@mui/material";
import React from "react";

function FeaturedPhoto(
  { onChangeFile, label, imgPreview, setImgPreview },
  ref
) {
  const handleInputIMG = (e) => {
    const file = e.target.files[0];
    console.log(file.type);
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
      console.log("no img");
    }
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
        <Box>
          <input
            ref={ref}
            style={{ display: "none" }}
            type="file"
            accept="image/png, image/gif, image/jpeg"
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
          {label ? (
            <Paper
              sx={{ color: "#dc3545", boxShadow: "none", maxWidth: "180px" }}
            >
              Vui lòng tải ảnh đại diện cho bài viết
            </Paper>
          ) : (
            <p>Tải ảnh đại diện cho bài viết</p>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default React.forwardRef(FeaturedPhoto);
